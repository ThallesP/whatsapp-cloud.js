import { IWebhookMessage } from "../@types";
import { Client } from "../client/client";

/**
 * Represents a message from Whatsapp
 */
export class Message {
  /**
   * The message content
   */
  public text: string;

  /**
   * The message ID
   */
  public id: string;

  /**
   * The number that the message was sent from
   * */
  public from: string;

  /**
   * The time which the message was sent
   * */
  public timestamp: Date;

  /**
   * Data is the raw data from the Webhook
   *
   * @internal
   */
  constructor(client: Client, data: IWebhookMessage) {
    this.id = data.id;

    this.from = data.from;

    this.text = data.text.body;

    const timestampInDate = new Date(0);
    timestampInDate.setUTCSeconds(Number(data.timestamp));
    this.timestamp = timestampInDate;
  }
}
