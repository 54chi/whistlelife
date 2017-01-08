# Whistle Life

Serverless Framework Alexa Lambda for Whistle. Made for the Smart Cities Hackathon @CES2017

## How it works

In the Alexa Developer Portal you can add your own skill. To do so you need to define the available intents and then connect them to a Lambda. You can update and define the Lambda with Serverless.

## Setup

In order to deploy the endpoint simply update the following placeholders in the code:

```
- defconSettings for each Defcon level (for dev only. The real skill uses a database and account management for preference settings)
- Tropo tokens for both the voice and the text version of the messaging service
- Firebase URL to store conversations

```

Once that's done, run this in the terminal:

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (378 B)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.........
Serverless: Stack update finished...
Serverless: Removing old service versions...
Service Information
service: aws-node-alexa-skill-2
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  None
functions:
  aws-node-alexa-skill-2-dev-whistle: arn:aws:lambda:us-east-1:377024778620:function:aws-node-alexa-skill-2-dev-whistle

```

Next we need to setup an Alexa skill. Once you've signed up for the Amazon Developer Platform visit `https://developer.amazon.com/edw/home.html`. There you should see the following screen:

![Welcome](https://cloud.githubusercontent.com/assets/223045/21183285/8403b37c-c207-11e6-89c0-d36582010af8.png)

Next click on `Add a new Skill`:

![Add Skill](https://cloud.githubusercontent.com/assets/223045/21183286/84051262-c207-11e6-8422-945b6b45e83b.png)

Go through the steps and fill in all the required fields e.g. Intent Schema and Sample Utterances:

Intent Schema
```
{
  "intents": [
    {
      "intent": "whistle",
      "slots": [
        {
          "name": "defconLevel",
          "type": "AMAZON.NUMBER"
        },
        {
          "name": "defconCustomMessage",
          "type" : "AMAZON.US_STATE"
        }
      ]
    }
  ]
}
```

NOTE: We are using US_STATE as the slot type as the more (or not?) meaningful "AMAZON.LITERAL" is going away Feb 2017.

Sample Utterances
```
whistle alert
whistle notify
whistle defcon {defconLevel}
whistle defcon level {defconLevel}
whistle {defconLevel}
whistle {defconLevel} that {defconCustomMessage}
whistle {defconLevel} {defconCustomMessage}
whistle defcon {defconLevel} that {defconCustomMessage}

```

The skill also replies back via custom SMS or Voice call. This is set up in Tropo. The current assigned number is: (650) 532-9782

Fill in the Lambda ARN which was printed or run `serverless info` to retrieve the ARN again.

Next up visit the test page, fill in the utterance and click on `Ask whistle` button.

Check out this [Amazon guide](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill#your-skill-is-published-now-what) to learn more about how to submit your skill for publication.
