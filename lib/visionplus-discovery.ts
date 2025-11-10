interface EndpointTest {
  name: string;
  url: string;
  purpose: string;
}

interface TestResult {
  name: string;
  url: string;
  status: number | string;
  accessible: boolean;
  hasForm?: boolean;
  requiresLogin?: boolean;
  formDetails?: FormDetails;
  pageTitle?: string;
  contentLength?: number;
  error?: string;
}

interface FormDetails {
  action: string | null;
  method: string;
  formId: string | null;
  hasViewState: boolean;
  hasEventValidation: boolean;
  hasEventTarget: boolean;
  hasEventArgument: boolean;
  inputFields: number;
  selectFields: number;
  totalFields: number;
}

interface LoginTestResult {
  loginPageExists: boolean;
  hasLoginForm?: boolean;
  formDetails?: FormDetails;
  pageTitle?: string;
  error?: string;
}

interface DiscoverySummary {
  totalEndpointsTested: number;
  accessibleEndpoints: number;
  formsFound: number;
  requiresAuthentication: boolean;
  loginPageAvailable: boolean;
  canProceedWithIntegration: boolean;
}

interface DiscoveryResult {
  baseUrl: string;
  accessTest: TestResult[];
  loginTest: LoginTestResult;
  summary: DiscoverySummary;
  recommendations: string[];
}

export class VisionPlusDiscovery {
  // USE YOUR ACTUAL VISIONPLUS URL
  private baseUrl = "http://185.132.36.86:8095";

  /**
   * STEP 1: Test main appointment endpoints
   */
  async testEndpointAccess(): Promise<TestResult[]> {
    console.log("🔍 Testing VisionPlus endpoint accessibility...");

    const endpoints: EndpointTest[] = [
      {
        name: "Appointment Link",
        url: "/MainModule/AppointmentLink.aspx",
        purpose: "Main appointment dashboard",
      },
      {
        name: "Online Appointments",
        url: "/MainModule/ManageOnlineAppointment.aspx",
        purpose: "Online appointment management",
      },
      {
        name: "Optometrist Diary",
        url: "/MainModule/OptometristDiary.aspx",
        purpose: "Primary booking interface",
      },
      {
        name: "New Patient Form",
        url: "/MainModule/ManagePatient.aspx?PatientId=0",
        purpose: "Patient registration",
      },
      {
        name: "Quick Registration",
        url: "/MainModule/QuickPatient.aspx",
        purpose: "Fast patient creation",
      },
    ];

    const results: TestResult[] = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing: ${endpoint.name}...`);

        const response = await fetch(`${this.baseUrl}${endpoint.url}`, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          },
          // Important: Include credentials if needed
          credentials: "include",
        });

        const html = await response.text();

        results.push({
          name: endpoint.name,
          url: endpoint.url,
          status: response.status,
          accessible: response.status === 200,
          hasForm: html.includes("<form") || html.includes("aspnetForm"),
          requiresLogin: this.checkRequiresLogin(html),
          formDetails: this.extractFormDetails(html),
          pageTitle: this.extractPageTitle(html),
          contentLength: html.length,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        results.push({
          name: endpoint.name,
          url: endpoint.url,
          status: "FAILED",
          accessible: false,
          error: errorMessage,
        });
      }
    }

    return results;
  }

  /**
   * Check if page requires login
   */
  private checkRequiresLogin(html: string): boolean {
    const loginIndicators = [
      "login",
      "Log In",
      "password",
      "Login.aspx",
      "Logout.aspx",
      "ctl00_lblUserTime",
      "Please log in",
      "Unauthorized",
    ];

    return loginIndicators.some((indicator) =>
      html.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  /**
   * Extract page title
   */
  private extractPageTitle(html: string): string {
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : "No title found";
  }

  /**
   * Extract basic form information
   */
  private extractFormDetails(html: string): FormDetails {
    const formActionMatch = html.match(/<form[^>]*action="([^"]*)"/i);
    const formMethodMatch = html.match(/<form[^>]*method="([^"]*)"/i);
    const formIdMatch = html.match(/<form[^>]*id="([^"]*)"/i);

    // Check for ASP.NET specific elements
    const hasViewState = html.includes("__VIEWSTATE");
    const hasEventValidation = html.includes("__EVENTVALIDATION");
    const hasEventTarget = html.includes("__EVENTTARGET");
    const hasEventArgument = html.includes("__EVENTARGUMENT");

    // Count form fields
    const inputFields = (html.match(/<input[^>]*>/gi) || []).length;
    const selectFields = (html.match(/<select[^>]*>/gi) || []).length;

    return {
      action: formActionMatch ? formActionMatch[1] : null,
      method: formMethodMatch ? formMethodMatch[1] : "POST",
      formId: formIdMatch ? formIdMatch[1] : null,
      hasViewState,
      hasEventValidation,
      hasEventTarget,
      hasEventArgument,
      inputFields,
      selectFields,
      totalFields: inputFields + selectFields,
    };
  }

  /**
   * STEP 2: Test login page if needed
   */
  async testLoginAccess(): Promise<LoginTestResult> {
    console.log("🔐 Testing login requirements...");

    try {
      const response = await fetch(`${this.baseUrl}/Login.aspx`, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      const html = await response.text();

      return {
        loginPageExists: response.status === 200,
        hasLoginForm: html.includes("password") || html.includes("Login"),
        formDetails: this.extractFormDetails(html),
        pageTitle: this.extractPageTitle(html),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        loginPageExists: false,
        error: errorMessage,
      };
    }
  }

  /**
   * STEP 3: Run complete discovery
   */
  async runDiscovery(): Promise<DiscoveryResult> {
    console.log("🚀 Starting VisionPlus Discovery...");

    const accessTest = await this.testEndpointAccess();
    const loginTest = await this.testLoginAccess();

    return {
      baseUrl: this.baseUrl,
      accessTest,
      loginTest,
      summary: this.generateSummary(accessTest, loginTest),
      recommendations: this.getRecommendations(accessTest, loginTest),
    };
  }

  private generateSummary(
    accessTest: TestResult[],
    loginTest: LoginTestResult
  ): DiscoverySummary {
    const accessibleEndpoints = accessTest.filter((e) => e.accessible);
    const formsFound = accessTest.filter((e) => e.hasForm);
    const requiresAuth = accessTest.some((e) => e.requiresLogin);

    return {
      totalEndpointsTested: accessTest.length,
      accessibleEndpoints: accessibleEndpoints.length,
      formsFound: formsFound.length,
      requiresAuthentication: requiresAuth,
      loginPageAvailable: loginTest.loginPageExists,
      canProceedWithIntegration: formsFound.length > 0,
    };
  }

  private getRecommendations(
    accessTest: TestResult[],
    loginTest: LoginTestResult
  ): string[] {
    const formsFound = accessTest.filter((e) => e.hasForm);

    if (formsFound.length === 0) {
      return ["❌ No forms found - cannot proceed with form-based integration"];
    }

    const requiresAuth = accessTest.some((e) => e.requiresLogin);

    if (requiresAuth && !loginTest.loginPageExists) {
      return ["❌ Requires authentication but no login page found"];
    }

    if (requiresAuth) {
      return [
        "✅ Forms found but require authentication",
        "➡️ Next: Implement login flow before form submission",
      ];
    }

    return [
      "✅ Forms accessible without authentication!",
      "➡️ Next: Implement direct form submission",
      "➡️ Analyze form structure for field mapping",
    ];
  }
}

// Utility function to test from command line
export async function testVisionPlusAccess(): Promise<DiscoveryResult> {
  const discovery = new VisionPlusDiscovery();
  const results = await discovery.runDiscovery();

  console.log("📊 VISIONPLUS DISCOVERY RESULTS:");
  console.log("Base URL:", results.baseUrl);
  console.log("Summary:", results.summary);
  console.log("Recommendations:", results.recommendations);
  console.log("\nDetailed Results:");
  console.log(JSON.stringify(results, null, 2));

  return results;
}
