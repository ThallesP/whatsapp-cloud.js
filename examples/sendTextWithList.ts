import "dotenv/config";

import { Client } from "../src";
import { Section } from "../src/components/Section";
import { RowSection } from "../src/components/SectionRow";

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN || "",
    phoneNumberID: process.env.PHONE_NUMBER_ID || "",
  },
});

(async () => {
  await client.messages.sendInteractiveMessage({
    type: "list",
    text: "Let's mark an appointment!",
    to: process.env.DST_NUMBER || "",
    buttonName: "Mark appointment",
    sections: [
      new Section()
        .setTitle("When you're available?")
        .addRows(
          new RowSection().setTitle("At 10:00 AM").setId("hour-10-pm"),
          new RowSection().setTitle("At 14:00 PM").setId("hour-3-pm")
        ),
    ],
  });
})();
