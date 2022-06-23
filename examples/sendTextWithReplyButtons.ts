import "dotenv/config";

import { Client } from "../src";
import { ReplyButton } from "../src/components/ReplyButton";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

(async () => {
  await client.messages.sendInteractiveMessage({
    type: "button",
    text: "Hi!!",
    to: process.env.DST_NUMBER || "",
    buttons: [new ReplyButton().setId("hey-button").setTitle("Hey!!!")],
  });
})();
