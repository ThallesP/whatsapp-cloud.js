import axios, { AxiosInstance } from "axios";

import { IAuthOptions, IGenericComponent } from "../@types";
import { IAPIRawButtonsAction, IAPIRawListAction } from "../@types/api";
import { Client } from "../client/client";
import { ReplyButton } from "../components/ReplyButton";
import { Section } from "../components/Section";
import { AxiosErrorInterceptor } from "../utils/AxiosErrorInterceptor";

export interface ISendTemplateMessageOptions {
  /** The number that this template will be sent */
  to: string;

  /**
   * The template language
   *
   * default: en_US
   */
  language?: string;

  /**
   * The template name
   */
  templateName: string;

  components: IGenericComponent[];
}

export interface IBaseSendInteractiveMessage {
  type: "button" | "list";
  to: string;
  text: string;
}

export interface ISendInteractiveButtonMessage
  extends IBaseSendInteractiveMessage {
  type: "button";
  buttons: ReplyButton[];
}

export interface ISendInteractiveListMessage
  extends IBaseSendInteractiveMessage {
  type: "list";
  to: string;
  buttonName: string;
  sections: Section[];
}

/**
 * Manages API methods for messages
 */
export class MessageManager {
  private request: AxiosInstance;

  /**
   * Manages API methods for messages
   * @internal
   */
  constructor(
    private client: Client,
    { accessToken, phoneNumberID }: IAuthOptions
  ) {
    this.request = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: `https://graph.facebook.com/v14.0/${phoneNumberID}`,
    });

    this.request.interceptors.response.use((res) => res, AxiosErrorInterceptor);
  }

  /**
   * Send a text message to a specific number
   */
  async sendTextMessage(text: string, to: string): Promise<void> {
    await this.request.post(`/messages`, {
      messaging_product: "whatsapp",
      to,
      text: {
        body: text,
      },
    });
  }

  /**
   * Sends interactive message (buttons and lists)
   * */
  async sendInteractiveMessage(
    message: ISendInteractiveButtonMessage | ISendInteractiveListMessage
  ): Promise<void> {
    const { to, type, text } = message;
    let action: IAPIRawButtonsAction | IAPIRawListAction | undefined;

    if (message.type === "button") {
      action = {
        buttons: message.buttons.map((button) => button.toAPIObject()),
      };
    } else if (message.type === "list") {
      action = {
        button: message.buttonName,
        sections: message.sections.map((section) => section.toAPIObject()),
      };
    }

    await this.request.post(`/messages`, {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        action,
        type,
        body: { text },
      },
    });
  }

  /**
   * Sends template message to a specific number
   */
  async sendTemplateMessage({
    to,
    templateName,
    components,
    language = "en_US",
  }: ISendTemplateMessageOptions) {
    await this.request.post("/messages", {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: language,
        },
        components: components.map((component) => component.toAPIObject()),
      },
    });
  }
}
