import axios, { AxiosInstance } from "axios";

import { IAuthOptions } from "../@types";
import { Client } from "../client/client";
import { AxiosErrorInterceptor } from "../utils/AxiosErrorInterceptor";

interface IComponent {
  type: string;
  index: number;
  text: string;
}

interface ISendTemplateMessage {
  /*
   * The number that this template will be sent
   * */
  to: string;

  /*
   * The template language
   *
   * default: en_US
   * */
  language?: string;

  /*
   * The template name
   * */
  templateName: string;

  /*
   * The variables that will be replaced in the message
   * */
  variables: IComponent[];
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
      baseURL: `https://graph.facebook.com/v13.0/${phoneNumberID}`,
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

  async sendTemplateMessage({
    to,
    templateName,
    variables,
    language = "en_US",
  }: ISendTemplateMessage) {
    await this.request.post("/messages", {
      messaging_product: "whatsapp",
      to,
      template: {
        name: templateName,
        language,
        components: [
          {
            type: "body",
            parameters: [...variables],
          },
        ],
      },
    });
  }
}
