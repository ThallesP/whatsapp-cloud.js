import fastify, { FastifyInstance } from "fastify";

import { IWebhookData } from "../../@types";
import { Client } from "../client";
import { MessageHandler } from "./handlers/MessageHandler";

export class Webhook {
  private server: FastifyInstance = fastify();
  private messageHandler: MessageHandler;

  constructor(private client: Client) {
    this.messageHandler = new MessageHandler(client);
  }

  async listenOn(port: number) {
    await this.server.listen(port);
  }

  async init() {
    this.server.all("/", {}, (request, reply) => {
      const body = request.body as IWebhookData<any>;
      const entries = body.entry;

      for (const entry of entries) {
        for (const change of entry.changes) {
          switch (change.field) {
            case "messages":
              this.messageHandler.handle(change.value);
              break;
            default:
              console.warn(`Unhandled change: ${change.field}`);
          }
        }
      }

      reply.status(200);
    });
  }
}
