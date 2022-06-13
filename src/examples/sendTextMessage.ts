import "dotenv/config";

import { Client } from "../index";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

interface ITemplate {
  helloWorld: string;
}

(async () => {
  await client.messages.sendTextMessage(
    "Hello, world",
    process.env.DESTINATION_PHONE_NUMBER || ""
  );

  await client.messages.sendTemplateMessage<ITemplate>(
    "sample_flight_confirmation",
    {
      helloWorld: "hello",
    }
  );

  await client.initializeWebhook(3000);
})();
