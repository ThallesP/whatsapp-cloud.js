import fastify, { FastifyInstance } from "fastify";

export class Webhook {
  private server: FastifyInstance = fastify();

  async listenOn(port: number) {
    await this.server.listen(port);
  }

  async init() {
    this.server.all("/", {}, (request, reply) => {
      console.log(JSON.stringify(request.body));
      reply.send("Hello world!");
    });
  }
}
