import "dotenv/config";

import { Client } from "../index";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

client.on("message", (message) => {
  console.log(`new message`, message);
});

client.initializeWebhook(3000).then(() => {
  console.log("I'm ready!!");
});
