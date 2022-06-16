// import "dotenv/config";

import { Client } from "../index";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

(async () => {
  await client.messages.sendTemplateMessage({
    to: process.env.DST_NUMBER || "",
    templateName: "password_test",
    bodyComponents: [
      {
        type: "currency",
        code: "USD",
        amount_1000: 1000,
        fallback_value: "1 dollar",
      },
    ],
  });
})();
