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
   * The contact that was sent this message
   */
  public sentTo: string;

  /**
   * Data is the raw data from the Webhook
   *
   * @internal
   */
  constructor(client: Client, data: any) {
    this.text = data.text;
    this.id = data.messages[0].id;
    this.sentTo = data.contacts[0].wa_id;
  }
}
