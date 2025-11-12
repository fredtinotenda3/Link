export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string | null;
  patientDOB?: string | null;
  branch: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  status: string;
  syncStatus: string;
  visionPlusId: string | null;
  source?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string | null;
  manualSyncRequestedAt?: string | null;
}

export interface StatusInfo {
  current: string;
  allowedTransitions: string[];
  canCancel: boolean;
  canConfirm: boolean;
  canComplete: boolean;
  canMarkNoShow: boolean;
}

export interface QueueStatus {
  queueStatus?: {
    needsSync: number;
    failedSyncs: number;
    manualRequired: number;
  };
  syncStatus?: {
    SYNCED: number;
    PENDING: number;
    FAILED: number;
    MANUAL_REQUIRED: number;
    NOT_APPLICABLE: number;
    MANUAL_SYNC_REQUESTED: number;
  };
  success?: boolean;
  error?: string;
  summary?: {
    processed: number;
    synced: number;
    failed: number;
  };
  totalAppointments?: number;
  recentActivity?: AppointmentActivity[];
  timestamp?: string;
}

export interface AppointmentActivity {
  id: string;
  patientName: string;
  syncStatus: string;
  visionPlusId: string | null;
  updatedAt: string;
}

export interface AppointmentFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDOB?: string;
  branch: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
}

export interface AppointmentCreateResponse {
  success: boolean;
  appointment?: Appointment;
  message?: string;
  error?: string;
}

export interface SyncStatusResponse {
  appointment?: {
    id: string;
    syncStatus: string;
    visionPlusId: string | null;
  };
  syncInfo?: {
    canSync: boolean;
    requiresManual: boolean;
    lastUpdated: string;
  };
}

export interface SyncDetail {
  appointmentId: string;
  patientName: string;
  success: boolean;
  method?: string;
  visionPlusId?: string;
  error?: string;
}

export interface BackgroundSyncResult {
  processed: number;
  synced: number;
  failed: number;
  details: SyncDetail[];
}

export interface BackgroundSyncResponse {
  success: boolean;
  message: string;
  summary: BackgroundSyncResult;
  timestamp: string;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
}
