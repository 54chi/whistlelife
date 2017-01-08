'use strict';
const request = require('request');

const defconSettings = [
  {phones: "+1234567890,+9876543210,+5555555555", message:"Defcon 1: Family Whistle"},
  {phones: "+1234567890", message: "Defcon 2: Family and Friends Whistle"},
  {phones: "+9876543210", message: "Defcon 3: Family and Friends + nearby Whistle"},
  {phones: "+5555555555", message: "Defcon 4: Family and Friends Whistle and police"},
  {phones: "+1234567890,+9876543210,+5555555555", message: "Defcon 5: Family and Friends Whistle and all city services including 911"}
];

module.exports.whistle = (event, context, callback) => {
  const defconLevel = event.request.intent.slots.defconLevel.value || 1;
  const phoneNumbers=defconSettings[defconLevel-1].phones;
  const defconPredefinedMessage = defconSettings[defconLevel-1].message;
  const defconMessage = event.request.intent.slots.defconCustomMessage.value || defconPredefinedMessage;
  const phoneMessage= "Whistle notification. Level "+defconLevel+": "+ defconMessage;
  const tropoToken=(defconLevel<5)?"<TROPO TOKEN FOR SMS>":"<TROPO TOKEN FOR VOICE>";

  var phoneToText = phoneNumbers.split(",");
  var d = new Date();
  var timestamp = d.toString();

  for (var i = 0; i < phoneToText.length; i++) {
    const tropoURL = "https://api.tropo.com/1.0/sessions?action=create&token="+tropoToken+"&phonenumber="+phoneToText[i]+"&phoneMessage="+phoneMessage;
    request(tropoURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    });
  };

  const firebaseUrl = "<FIREBASE URL>";
  for (var i = 0; i < phoneToText.length; i++) {
      request.post(
          firebaseUrl,
          { json: { phone: `${phoneToText[i]}`,
                    level: `${defconLevel}`,
                    message: `${defconMessage}`,
                    timestamp: `${timestamp}`
          }},
          function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  console.log(body)
              }
          }
      );
  };

  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: `${phoneMessage}`,
      },
    },
  };
  callback(null, response);
};
