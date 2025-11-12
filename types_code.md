===============================
  types\api.ts
===============================
`$lang
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

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

```

===============================
  types\appointment.ts
===============================
`$lang
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

```

===============================
  types\auth.ts
===============================
`$lang
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

```

===============================
  types\booking.ts
===============================
`$lang
import { BOOKING_BRANCHES, SERVICE_TYPES } from "@/constants/booking";

export type BookingBranch = (typeof BOOKING_BRANCHES)[number];
export type ServiceType = (typeof SERVICE_TYPES)[number];

export interface BookingFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDOB?: string;
  branch: BookingBranch;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: ServiceType;
}

```

===============================
  types\branches.ts
===============================
`$lang
export interface Branch {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: readonly string[];
  features: readonly string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
}

export interface BranchHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface BranchCoordinates {
  lat: number;
  lng: number;
}

```

===============================
  types\company.ts
===============================
`$lang
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface MissionStatement {
  title: string;
  description: string;
}

export interface CompanyStats {
  readonly yearsExperience: string;
  readonly patientsServed: string;
  readonly branches: string;
  readonly sameDayService: string;
}

```

===============================
  types\contact.ts
===============================
`$lang
export interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  details: string;
  cta: string;
  action: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

```

===============================
  types\email.ts
===============================
`$lang
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

```

===============================
  types\frames.ts
===============================
`$lang
export type FrameCategory = "designer" | "premium" | "standard" | "budget";
export type LensType = "single" | "bifocal" | "progressive" | "blue-light";

export interface Frame {
  id: string;
  name: string;
  brand: string;
  category: FrameCategory;
  priceRange: string;
  features: readonly string[];
  description: string;
  image: string;
  availableColors: readonly string[];
}

export interface Lens {
  id: string;
  name: string;
  type: LensType;
  features: readonly string[];
  description: string;
  priceRange: string;
}

export interface FrameCategoryInfo {
  id: string;
  name: string;
  count: number;
}

```

===============================
  types\index.ts
===============================
`$lang
export * from "./appointment";
export * from "./booking";
export * from "./auth";
export * from "./company";
export * from "./team";
export * from "./services";
export * from "./testimonials";
export * from "./branches";
export * from "./contact";
export * from "./notification";
export * from "./frames";
export * from "./visionplus";
export * from "./api";
export * from "./email";
export * from "./sms";

```

===============================
  types\next-auth.d.ts
===============================
`$lang
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
  }
}

```

===============================
  types\notification.ts
===============================
`$lang
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

```

===============================
  types\services.ts
===============================
`$lang
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: readonly string[];
  image: string;
  cta: string;
  duration: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface BranchService {
  branch: string;
  services: string;
}

export interface BranchFeature {
  icon: string;
  title: string;
  description: string;
}

```

===============================
  types\sms.ts
===============================
`$lang
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

```

===============================
  types\team.ts
===============================
`$lang
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  expertise: readonly string[]; // âœ… Change to readonly
  image: string;
}

```

===============================
  types\testimonials.ts
===============================
`$lang
export interface Testimonials {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

```

===============================
  types\visionplus.ts
===============================
`$lang
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
  result?: Record<string, unknown>;
}

export interface SyncResult {
  success: boolean;
  visionPlusId?: string;
  method: "DATABASE" | "FORM" | "API" | "MANUAL" | "STATUS_UPDATE";
  error?: string;
  responseData?: unknown;
}

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
  [key: string]: unknown;
}

```

