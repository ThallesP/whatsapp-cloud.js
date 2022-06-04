import { Message } from "../structures/Message";

export interface IAuthOptions {
  accessToken: string;
  phoneNumberID: string;
}

export interface IClientOptions {
  auth: IAuthOptions;
}

export interface IClientEvents {
  message: (message: Message) => void;
}

export interface IWebhookData<T> {
  object: string;
  entry: {
    id: string;
    changes: {
      field: string;
      value: T;
    }[];
  }[];
}

export interface IWebhookMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text: {
    body: string;
  };
}

export interface IWebhookMessageData {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts: {
    profile: {
      name: string;
    };
    wa_id: string;
  }[];
  messages: IWebhookMessage[];
}
