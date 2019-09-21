// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const interceptors = require('./interceptors');
const GameEngine = require('./game-engine');
const persistence = require('./persistence');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        console.log(sessionAttributes)
        
        const currentStatus = sessionAttributes.currentStatus;
        
        let speakOutput = '';

        speakOutput = (currentStatus && (currentStatus.finished || currentStatus.position === 1))?handlerInput.t('WELCOME_MSG'): handlerInput.t('WELCOME_BACK_MSG');
        

        return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
    }
};
const StartGameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        const newStatus = GameEngine.startGame();
        
        sessionAttributes.currentStatus = newStatus;
        
        const topic = newStatus.topic
        const firstWord = newStatus.wordList[0]
        
        const trasnlatedTopic = handlerInput.t(topic);
        
        const speakOutput = handlerInput.t('GAME_START', {trasnlatedTopic: trasnlatedTopic, firstWord:firstWord});
        //`¡Vamos a empezar! <audio src="soundbank://soundlibrary/vehicles/horns_honks/horns_14"/> El tema es ${trasnlatedTopic}. Empiezo yo, voy a ir de camping y voy a llevar... ${firstWord}`;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            //.withStandardCard('Sí mi Capitán', 'hola', 'adios',  "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_720x480_card_small.png", "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_1200x800_card_large.png")
            .getResponse();
    }
};

const GameContinueIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameContinueIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        const currentStatus = sessionAttributes.currentStatus;
        console.log(sessionAttributes);
        
        const topic = currentStatus.topic
        
        const trasnlatedTopic = handlerInput.t(topic);
        const speakOutput = handlerInput.t('CONTINUE_GAME', {topic: trasnlatedTopic, wordList: currentStatus.wordList.toString()});

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};


const GameStepIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameStepIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        const intent = handlerInput.requestEnvelope.request.intent;
        const word = intent.slots.StepValue.value;
        
        const currentStatus = sessionAttributes.currentStatus;
        console.log(sessionAttributes);
        
        const { result, status } = GameEngine.validateWord(currentStatus, word);
        
        let speakOutput = '';
        
        if (status.finished) {
            speakOutput = handlerInput.t('GAME_END', {secretWord: status.secretWord});
            handlerInput.attributesManager.setSessionAttributes({});

        } else {
            speakOutput = result ?  handlerInput.t('GAME_STEP_OK_MSG'): handlerInput.t('GAME_STEP_NOK_MSG');
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            //.withStandardCard('Sí mi Capitán', 'hola', 'adios',  "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_720x480_card_small.png", "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_1200x800_card_large.png")
            .getResponse();
    }
};

const GameEndIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameEndIntent';
    },
    handle(handlerInput) {
        
        const intent = handlerInput.requestEnvelope.request.intent;
        
        const finalWord = intent.slots.EndGameValue.value;
        
        const win = GameEngine.validateWord(finalWord);
        
        const speakOutput = win ? '¡Muy bien! Has ganado': 'Lo siento, sigue intentandolo';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('BYE_MSG');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartGameIntentHandler,
        GameContinueIntentHandler,
        GameStepIntentHandler,
//        EndGameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    ).addRequestInterceptors(
        interceptors.LocalisationRequestInterceptor,
        interceptors.LoggingRequestInterceptor,
        interceptors.LoadAttributesRequestInterceptor
        )
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor,
        interceptors.SaveAttributesResponseInterceptor
        )
    .withPersistenceAdapter(persistence.getPersistenceAdapter())
    .lambda();
