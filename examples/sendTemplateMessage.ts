import "dotenv/config";

import { Client } from "../src";
import { TextComponent } from "../src/components/TextComponent";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

(async () => {
  await client.messages.sendTemplateMessage({
    to: process.env.DST_NUMBER || "",
    templateName: "welcome_message",
    components: [new TextComponent().setText("Sr. Brega")],
  });
})();
