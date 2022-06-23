import axios, { AxiosInstance } from "axios";

import {
  IAuthOptions,
  IBodyComponents,
  IButtonComponents,
  IComponent,
  IHeaderComponents,
} from "../@types";
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

  /**
   * The template components for the body of the message.
   *
   * The components will be replaced by the variables in your template.
   *
   * Example:
   * Here's your one time password {{1}} // "1" will be replaced by the component specified
   * */
  bodyComponents?: IBodyComponents;

  /**
   * The template components for the header of the message.
   *
   * They'll be replaced by the variables in your template.
   *
   * Example:
   * Thanks for choosing us {{1}}. // "1" will be replaced by the component specified
   * */
  headerComponents?: IHeaderComponents;

  /**
   * The template components for the button of the message.
   *
   * They'll be replaced by the variables in your template.
   *
   * Example:
   * Click here to buy {{1}}. // "1" will be replaced by the component specified
   * */
  buttonComponents?: IButtonComponents;
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
    bodyComponents,
    buttonComponents,
    headerComponents,
    language = "en_US",
  }: ISendTemplateMessageOptions) {
    const components = [];

    const convertToAPIComponent = (component: IComponent) => {
      if (component.type === "currency") {
        const { code, amount_1000, fallback_value } = component;
        return {
          type: "currency",
          currency: { code, fallback_value, amount_1000 },
        };
      }

      if (component.type === "date_time") {
        const { fallback_value } = component;
        return {
          type: "date_time",
          date_time: {
            fallback_value,
          },
        };
      }

      return component;
    };

    if (bodyComponents) {
      components.push({
        type: "body",
        parameters: bodyComponents.map((component) =>
          convertToAPIComponent(component)
        ),
      });
    }

    if (buttonComponents) {
      components.push({
        type: "button",
        parameters: buttonComponents.map((component) =>
          convertToAPIComponent(component)
        ),
      });
    }

    if (headerComponents) {
      components.push({
        type: "header",
        parameters: headerComponents.map((component) =>
          convertToAPIComponent(component)
        ),
      });
    }

    await this.request.post("/messages", {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: language,
        },
        components,
      },
    });
  }
}
