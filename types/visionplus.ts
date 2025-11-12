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
