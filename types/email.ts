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
