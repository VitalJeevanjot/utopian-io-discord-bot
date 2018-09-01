const Discord = require('discord.js');
const client = new Discord.Client();
const Config = require('./config.json');

const Steem = require('steem');

client.login(Config.token);

client.on('ready', () => {
  console.log("I am ready");
  var channel = client.channels.get('channelid'); // put channel id here...
  Steem.api.streamTransactions('head', (error, result) => {
    let txType = result.operations[0][0]
    let txData = result.operations[0][1]

    if (txType == "vote" && txData.voter == "utopian-io") {
      let vote_w = txData.weight/100;
      channel.send("I just UpVoted https://steemit.com/@"+txData.author+"/"+txData.permlink+" with "+vote_w+"% weight");
    }
    if (txType == "comment" && txData.author == "utopian-io" && txData.parent_author == "") {
      channel.send("Checkout my new post https://steemit.com/@"+txData.author+"/"+txData.permlink);
    }
  });
});

