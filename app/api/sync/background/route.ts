import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { SyncStatus } from "@/lib/generated/prisma";

// Define proper type for sync details
interface SyncDetail {
  appointmentId: string;
  patientName: string;
  success: boolean;
  method?: string;
  visionPlusId?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { maxRetries = 5, batchSize = 10 } = await request.json();

    console.log(
      `🔄 Starting background sync: maxRetries=${maxRetries}, batchSize=${batchSize}`
    );

    // Find appointments that need syncing - use string literals as fallback
    const pendingAppointments = await prisma.appointment.findMany({
      where: {
        OR: [
          { syncStatus: "PENDING" as SyncStatus },
          { syncStatus: "FAILED" as SyncStatus },
        ],
      },
      take: batchSize,
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(`📋 Found ${pendingAppointments.length} appointments to sync`);

    if (pendingAppointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No appointments need syncing",
        processed: 0,
        synced: 0,
        failed: 0,
      });
    }

    const integration = new VisionPlusIntegration();
    const results = {
      processed: 0,
      synced: 0,
      failed: 0,
      details: [] as SyncDetail[],
    };

    // Process each appointment
    for (const appointment of pendingAppointments) {
      try {
        results.processed++;

        console.log(
          `🔄 Syncing appointment ${appointment.id}: ${appointment.patientName}`
        );

        const syncResult = await integration.syncAppointment(appointment.id);

        if (syncResult.success) {
          results.synced++;
          console.log(`✅ Successfully synced appointment ${appointment.id}`);
        } else {
          results.failed++;
          console.log(
            `❌ Failed to sync appointment ${appointment.id}:`,
            syncResult.error
          );
        }

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          success: syncResult.success,
          method: syncResult.method,
          visionPlusId: syncResult.visionPlusId,
          error: syncResult.error,
        });

        // Small delay to avoid overwhelming VisionPlus
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed++;
        console.error(`💥 Error syncing appointment ${appointment.id}:`, error);

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log(
      `🎉 Background sync completed: ${results.synced} synced, ${results.failed} failed`
    );

    return NextResponse.json({
      success: true,
      message: `Background sync completed: ${results.synced} synced, ${results.failed} failed`,
      summary: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Background sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Background sync failed",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync queue status
export async function GET() {
  try {
    const syncStats = await prisma.appointment.groupBy({
      by: ["syncStatus"],
      _count: {
        id: true,
      },
    });

    const totalAppointments = await prisma.appointment.count(); // 🆕 FIXED: removed extra .appisma

    // Get recent sync activity (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentActivity = await prisma.appointment.findMany({
      where: {
        updatedAt: {
          gte: twentyFourHoursAgo,
        },
        OR: [
          { syncStatus: "SYNCED" as SyncStatus },
          { syncStatus: "FAILED" as SyncStatus },
        ],
      },
      select: {
        id: true,
        patientName: true,
        syncStatus: true,
        visionPlusId: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });

    // Helper function to safely get count for a sync status
    const getCountForStatus = (status: string): number => {
      const stat = syncStats.find((s) => s.syncStatus === status);
      return stat?._count.id || 0;
    };

    return NextResponse.json({
      syncStatus: syncStats.reduce((acc, stat) => {
        acc[stat.syncStatus] = stat._count.id;
        return acc;
      }, {} as Record<string, number>),
      totalAppointments,
      recentActivity,
      queueStatus: {
        needsSync: getCountForStatus("PENDING"),
        failedSyncs: getCountForStatus("FAILED"),
        manualRequired: getCountForStatus("MANUAL_REQUIRED"),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get sync status error:", error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}
