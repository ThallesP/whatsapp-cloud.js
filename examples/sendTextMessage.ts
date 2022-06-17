import "dotenv/config";

import { Client } from "../src";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

(async () => {
  await client.messages.sendTextMessage(
    "Hello, world",
    process.env.DESTINATION_PHONE_NUMBER || ""
  );

  await client.initializeWebhook(3000);
})();
