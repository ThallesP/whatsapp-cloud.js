import { IWebhookMessageData } from "../../../@types";
import { Message } from "../../../structures/Message";
import { Client } from "../../client";

export class MessageHandler {
  constructor(private client: Client) {}

  async handle(data: IWebhookMessageData) {
    for (const webhookMessage of data.messages) {
      const message = new Message(this.client, webhookMessage);
      this.client.emit("message", message);
    }
  }
}
