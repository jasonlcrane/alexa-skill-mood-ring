'use strict';
var Alexa = require("alexa-sdk");
var appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';
var moods = require('./moods');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'MoodIntent': function () {
        var itemSlot = this.event.request.intent.slots.Color;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = 'Your mood ring is ' + itemName;
        var moods = this.t("MOODS");
        var mood = moods[itemName];

        if (mood) {
            this.attributes['speechOutput'] = mood;
            this.emit(':tellWithCard', mood, cardTitle, mood);
        } else {
            var speechOutput = this.t("MOOD_NOT_FOUND_MESSAGE");
            var repromptSpeech = this.t("MOOD_NOT_FOUND_REPROMPT");
            if (itemName) {
                speechOutput += this.t("MOOD_NOT_FOUND_WITH_ITEM_NAME", itemName);
            } else {
                speechOutput += this.t("MOOD_NOT_FOUND_WITHOUT_ITEM_NAME");
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    }
};

var languageStrings = {
    "en": {
        "translation": {
            "MOODS": moods.MOOD_EN_US,
            "SKILL_NAME": "Mood Ring",
            "WELCOME_MESSAGE": "Welcome to %s. You can ask a question like, what does green mean? ... Now, what can I help you with?",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - Mood for %s.",
            "HELP_MESSAGE": "ou can ask questions such as, what does blue mean, or, you can say exit... Now, what can I help you with?",
            "HELP_REPROMPT": "You can say things like, what does blue mean, or you can say exit... Now, what can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "MOOD_REPEAT_MESSAGE": "Try saying repeat.",
            "MOOD_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know ",
            "MOOD_NOT_FOUND_WITH_ITEM_NAME": "the mood for %s. ",
            "MOOD_NOT_FOUND_WITHOUT_ITEM_NAME": "that mood. ",
            "MOOD_NOT_FOUND_REPROMPT": "What else can I help with?"
        }
    }
};