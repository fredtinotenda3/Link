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
