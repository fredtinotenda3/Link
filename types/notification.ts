export interface NotificationResult {
  success: boolean;
  error?: string;
  messageId?: string;
  details?: Record<string, unknown>;
}

export interface NotificationConfig {
  email: {
    configured: boolean;
    provider?: string;
  };
  sms: {
    configured: boolean;
    provider?: string;
  };
}

export interface NotificationTestResponse {
  success: boolean;
  configuration?: NotificationConfig;
  testAppointment?: {
    id: string;
    patientName: string;
    patientEmail: string | null;
    patientPhone: string | null;
  };
  instructions?: {
    email: string;
    sms: string;
  };
  result?: NotificationResult;
  error?: string;
}
