<h1 align="center">Whatsapp Cloud JS</h1>
Whatsapp Cloud JS is a library to allows you to interact with Whatsapp's Cloud API

# 🚀 Getting started
```ts
import { Client } from 'whatsapp-cloud.js'

const client = new Client({
  auth: {
    accessToken: process.env.ACCESS_TOKEN,
    phoneNumberID: process.env.PHONE_NUMBER_ID,
  },
});

client.on("message", async (message) => {
    await client.messages.sendTextMessage(
        `Did you said "${message.text}"?`,
        message.from
    );
});

client.initializeWebhook(3000).then(() => {
  console.log("Ready!");
});
```

# 💡 Documentation
You can find the documentation at https://thallesp.github.io/whatsapp-cloud.js (docs in beta).  
You can find examples at the [examples folder](examples).

# 📋 TODO
[x] - Ability to send text messages  
[x] - Finish HTTP server to receive Whatsapp events  
[x] - Ability to send template messages  
[x] - Ability to send reply buttons  
[x] - Ability to send sections  
[] - Ability to send media messages
