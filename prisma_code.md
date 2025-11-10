===============================
  prisma\schema.prisma
===============================
`$lang
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Appointment {
  id            String   @id @default(cuid())
  patientName   String
  patientEmail  String?
  patientPhone  String?
  patientDOB    DateTime?

  branch            String
  appointmentDate   DateTime
  appointmentTime   String
  serviceType       String

  status        AppointmentStatus @default(PENDING)
  source        String @default("WEBSITE")

  visionPlusId  String?
  syncStatus    SyncStatus @default(PENDING)

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  syncedAt            DateTime?
  manualSyncRequestedAt DateTime?

  @@map("appointments")
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  NOSHOW
}

enum SyncStatus {
  PENDING
  SYNCED
  FAILED
  NOT_APPLICABLE
  MANUAL_REQUIRED
  MANUAL_SYNC_REQUESTED
}
```

