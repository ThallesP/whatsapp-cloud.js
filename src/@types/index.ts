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

export interface ITextComponent {
  type: "text";
  text: string;
}

export interface ICurrencyComponent {
  type: "currency";
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export interface IDateTimeComponent {
  type: "date_time";
  fallback_value: Date | string;
}

export type IComponent =
  | ITextComponent
  | ICurrencyComponent
  | IDateTimeComponent;

export type IBodyComponents =
  | ITextComponent[]
  | ICurrencyComponent[]
  | IDateTimeComponent[];

export type IHeaderComponents = ICurrencyComponent[] | IDateTimeComponent[];

export type IButtonComponents = ICurrencyComponent[] | IDateTimeComponent[];
