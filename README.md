<h1 align="center">Whatsapp Cloud JS</h1>
Whatsapp Cloud JS is a library to allows you to interact with Whatsapp's Cloud API

# 🚀 Getting started
```ts
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

# 📋 TODO
[x] - Ability to send text messages  
[x] - Finish HTTP server to receive Whatsapp events  
[] - Ability to send reply buttons  
[] - Ability to send document messages
