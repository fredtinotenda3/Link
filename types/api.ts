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
