import { TypedEmitter } from "tiny-typed-emitter";

import { IClientEvents, IClientOptions } from "../@types";
import { MessageManager } from "../managers/MessageManager";
import { Webhook } from "./webhook/Webhook";

export class Client extends TypedEmitter<IClientEvents> {
  private readonly phoneNumberID: string;
  private readonly accessToken: string;
  private webhook: Webhook;

  constructor({ auth }: IClientOptions) {
    super();

    this.phoneNumberID = auth.phoneNumberID;
    this.accessToken = auth.accessToken;

    this.messages = new MessageManager(this, {
      phoneNumberID: this.phoneNumberID,
      accessToken: this.accessToken,
    });

    this.webhook = new Webhook();
  }

  messages: MessageManager;

  /**
   * Initialize an HTTP server to receive events from Whatsapp Cloud API
   * */
  async initializeWebhook(port: number) {
    await this.webhook.init();
    await this.webhook.listenOn(port);
  }
}
