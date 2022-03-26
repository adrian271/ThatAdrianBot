let tmi = require("tmi.js");
let channel = "thatadrianbot";

let config = {
  options: { debug: true },
  identity: {
    username: channel,
    password: process.env.THATADRIANBOT_TMI_TOKEN,
  },
  channels: ["thatadrianguy"],
};

let client = new tmi.client(config);
client.connect();

client.on("connected", (address, port) => {
  client.action(channel, "👋 🤖 Hello").catch((err) => {
    console.log(err);
  });
});

let slugzyCount = 0;
let cp80xdCount = 0;

client.on("chat", (channel, user, message, self) => {
  if (self) return; // We don't want to evaluate chat bot so break out if is bot

  //This one is just for slugzy
  if (user.username === "ttvslugzy" && slugzyCount !== 0) {
    client.say(channel, "whadup slugzy");
    slugzyCount++;
  }
  //This one is just for slugzy
  if (user.username === "cp80xd" && cp80xdCount !== 0) {
    client.say(channel, "whadup CP80XD");
    slugzyCount++;
  }

  //nice
  if (message.includes("69")) client.say(channel, "nice");

  if (user["first-msg"])
    client.say(channel, `Hey, Welcome ${user["display-name"]}`);

  //lurks
  if (message.indexOf("!lurk") === 0)
    client.say(
      channel,
      `👀 Hi ${user["display-name"]}! thank you for the lurk! 🙌. Got a tech question? fire away 💥`
    );

  //so
  if (message.indexOf("!so") === 0) {
    let soPerson = message.split(" ")[1]; // !so thatadrianguy
    if (soPerson.indexOf("@") === 0) soPerson = soPerson.substring(1);
    client.say(
      channel,
      `👇 https://twitch.tv/${soPerson.toLowerCase()} Shout out to ${soPerson}! Give them a follow, I'm serious!`
    );
  }
});
