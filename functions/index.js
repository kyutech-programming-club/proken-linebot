const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
require('firebase-functions/lib/logger/compat');

const config = {
  channelAccessToken: "",
  channelSecret: "",
};

const client = new line.Client(config);

exports.kaijiScream = functions
  .region("asia-northeast2")
  .https.onRequest(async (request, response) => {
    if (request.body.events == []) {
      response.json({
        state: "これは検証です",
      })
    }
    const events = request.body.events;
    const text = events[0].message.text;
    var sendMessage = {};
    if (text == "グー") {
      sendMessage = {
        type: "text",
        text: "パー",
      };
    } else if (text == "チョキ") {
      sendMessage = {
        type: "text",
        text: "グー",
      };
    } else if (text == "パー") {
      sendMessage = {
        type: "text",
        text: "チョキ",
      };
    } else {
      sendMessage = {
        type: "text",
        text: "じゃんけんをしましょう",
      };
    }
    const result = await client.replyMessage(events[0].replyToken, sendMessage);
    response.json(result);
    // const result = await client.replyMessage(events[0].replyToken, );
    
  });
