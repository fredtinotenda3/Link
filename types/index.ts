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
  manualSyncRequestedAt?: string | null; // ✅ ADD THIS LINE
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

// 🆕 Activity type for recent sync activity
export interface AppointmentActivity {
  id: string;
  patientName: string;
  syncStatus: string;
  visionPlusId: string | null;
  updatedAt: string;
}

// 🆕 Test-related types
export interface TestDetails {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | TestDetails
    | TestDetails[];
}

export interface TestResult {
  step: string;
  status: "success" | "error" | "warning" | "pending";
  message: string;
  details?: TestDetails;
}

export interface VisionPlusConnection {
  requiresAuthentication: boolean;
  url: string;
  status: number;
  message?: string;
}

export interface VisionPlusTestResult {
  success: boolean;
  connection?: VisionPlusConnection;
  error?: string;
  result?: TestDetails;
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

export interface AppointmentCreateResponse {
  success: boolean;
  appointment?: Appointment;
  message?: string;
  error?: string;
}

// 🆕 Background sync result types
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

// 🆕 Notification types
export interface NotificationResult {
  success: boolean;
  error?: string;
  messageId?: string;
  details?: TestDetails;
}

// 🆕 Form submission types
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

// 🆕 Notification configuration types
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

export interface AppointmentsResponse {
  appointments: Appointment[];
}

// 🆕 VisionPlus Discovery Types
export interface VisionPlusFormDetails {
  action: string | null;
  method: string;
  fields: string[];
  submitButton: string | null;
  formId: string | null;
  formName: string | null;
  hasFileUpload: boolean;
  hasCaptcha: boolean;
  fieldCount: number;
  totalFields: number;
}

export interface VisionPlusAccessTest {
  name: string;
  url: string;
  status: number;
  accessible: boolean;
  hasForm: boolean;
  requiresLogin: boolean;
  formDetails: VisionPlusFormDetails;
  pageTitle: string;
  contentLength: number;
  error?: string;
}

export interface VisionPlusDiscoverySummary {
  totalEndpointsTested: number;
  accessibleEndpoints: number;
  formsFound: number;
  requiresAuthentication: boolean;
  serverStatus: string;
  baseUrl: string;
}

// 🆕 Make properties optional to match actual API response
export interface VisionPlusDiscoveryResult {
  baseUrl: string;
  accessTest: VisionPlusAccessTest[];
  loginRequired?: boolean;
  formsFound?: number;
  accessibleEndpoints?: number;
  recommendations: string[];
  summary: VisionPlusDiscoverySummary;
  endpoints?: Array<{
    url: string;
    status: number;
    accessible: boolean;
    type: string;
    details?: string;
    formFields?: string[];
  }>;
  error?: string;
}

// 🆕 Flexible type for API response that might have different property names
export interface VisionPlusApiResponse {
  baseUrl?: string;
  accessTest?: VisionPlusAccessTest[];
  loginRequired?: boolean;
  formsFound?: number;
  accessibleEndpoints?: number;
  recommendations?: string[];
  summary?: Partial<VisionPlusDiscoverySummary>;
  endpoints?: Array<{
    url: string;
    status: number;
    accessible: boolean;
    type: string;
    details?: string;
    formFields?: string[];
  }>;
  error?: string;
  // Allow for other properties that might come from the API
  [key: string]: unknown;
}

// 🆕 Integration test types
export interface IntegrationTestDetails {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | IntegrationTestDetails
    | IntegrationTestDetails[];
}

export interface IntegrationTestResult {
  step: string;
  status: "success" | "error" | "warning" | "pending";
  message: string;
  details?: IntegrationTestDetails;
}

// 🆕 Email Service Types
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface EmailProvider {
  send: (to: string, template: EmailTemplate) => Promise<EmailResult>;
}

// 🆕 SendGrid Types
export interface SendGridMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

export interface SendGridResponse {
  [key: string]: unknown;
}

export interface SendGridModule {
  setApiKey: (apiKey: string) => void;
  send: (message: SendGridMessage) => Promise<SendGridResponse[]>;
}

// 🆕 Resend Types
export interface ResendEmailOptions {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
}

export interface ResendResponseData {
  id: string;
}

export interface ResendResponseError {
  message: string;
  name?: string;
}

export interface ResendResponse {
  data?: ResendResponseData;
  error?: ResendResponseError;
}

export interface ResendEmailInstance {
  send: (options: ResendEmailOptions) => Promise<ResendResponse>;
}

export interface ResendClass {
  new (apiKey: string): {
    emails: ResendEmailInstance;
  };
}

export interface ResendModule {
  Resend: ResendClass;
}

// 🆕 Nodemailer Types
export interface NodemailerMessage {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface NodemailerAuth {
  user: string;
  pass: string;
}

export interface NodemailerConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: NodemailerAuth;
}

export interface NodemailerTransporter {
  sendMail: (message: NodemailerMessage) => Promise<{ messageId: string }>;
}

export interface NodemailerModule {
  createTransport: (config: NodemailerConfig) => NodemailerTransporter;
}

// 🆕 SMS Service Types
export interface SmsMessage {
  to: string;
  body: string;
  from?: string;
}

export interface SmsResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface SmsProvider {
  send: (message: SmsMessage) => Promise<SmsResult>;
}

// 🆕 Twilio Types
export interface TwilioMessageOptions {
  body: string;
  from: string;
  to: string;
}

export interface TwilioMessageInstance {
  sid: string;
  status: string;
}

export interface TwilioClient {
  messages: {
    create: (options: TwilioMessageOptions) => Promise<TwilioMessageInstance>;
  };
}

export interface TwilioModule {
  Twilio: new (accountSid: string, authToken: string) => TwilioClient;
}

// 🆕 Africa's Talking Types
export interface AfricaTalkingSmsOptions {
  to: string[];
  message: string;
  from?: string;
}

export interface AfricaTalkingSmsResponse {
  SMSMessageData: {
    Message: string;
    Recipients: Array<{
      status: string;
      number: string;
      messageId: string;
      cost: string;
    }>;
  };
}

export interface AfricaTalkingInstance {
  SMS: {
    send: (
      options: AfricaTalkingSmsOptions
    ) => Promise<AfricaTalkingSmsResponse>;
  };
}

export interface AfricaTalkingModule {
  default: {
    initialize: (config: {
      apiKey: string;
      username: string;
    }) => AfricaTalkingInstance;
  };
}
