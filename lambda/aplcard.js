const APLHomeCardRequestInterceptor = {
    process(handlerInput) {
        const withSimpleCard = handlerInput.responseBuilder.withSimpleCard;
        const withStandardCard = handlerInput.responseBuilder.withStandardCard;
        function withSimpleAPLCard(cardTitle, cardContent){
            if(supportsAPL(handlerInput)){
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APLDoc,
                    datasources: {
                        templateData: {
                            "header": cardTitle,
                            "text": cardContent,
                            // default background for simple card
                            "backgroundSmall": "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_720x480_card_small.png",
                            "backgroundLarge": "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_1200x800_card_large.png"
                        }
                    }
                })
            }
            withSimpleCard(cardTitle, cardContent);
            return handlerInput.responseBuilder;
        }
        function withStandardAPLCard(cardTitle, cardContent, smallImageUrl, largeImageUrl){
            if(supportsAPL(handlerInput)){
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APLDoc,
                    datasources: {
                        templateData: {
                            "header": cardTitle,
                            "text": cardContent,
                            "backgroundSmall": "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_720x480_card_small.png", //smallImageUrl,
                            "backgroundLarge": "https://s3-eu-west-1.amazonaws.com/happybirthday-alexa/papers_1200x800_card_large.png" //largeImageUrl
                        }
                    }
                })
            }
            withStandardCard(cardTitle, cardContent, smallImageUrl, largeImageUrl);
            return handlerInput.responseBuilder;
        }
        handlerInput.responseBuilder.withSimpleCard = (...args) => withSimpleAPLCard(...args);
        handlerInput.responseBuilder.withStandardCard = (...args) => withStandardAPLCard(...args);
    }
}

function supportsAPL(handlerInput){
    const {supportedInterfaces} = handlerInput.requestEnvelope.context.System.device;
    return supportedInterfaces['Alexa.Presentation.APL'];
}

function deviceType(handlerInput){
    if(supportsAPL(handlerInput)){
        const {Viewport} = handlerInput.requestEnvelope.context;
        const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
        switch(resolution){
            case "480x480": return "EchoSpot";
            case "960x480": return "EchoShow5";
            case "1024x600": return "EchoShow";
            case "1200x800": return "FireHD8";
            case "1280x800": return "EchoShow2";
            case "1920x1080": return "FireTV";
            case "1920x1200": return "FireHD10";
            default: return "unknown";
        }
    } else {
        return "screenless";
    }
}

const APLDoc = 
{
    "document": {
        "type": "APL",
        "version": "1.1",
        "settings": {},
        "theme": "dark",
        "import": [
            {
                "name": "alexa-layouts",
                "version": "1.0.0"
            }
        ],
        "resources": [
            {
                "description": "Stock color for the light theme",
                "colors": {
                    "colorTextPrimary": "#151920"
                }
            },
            {
                "description": "Stock color for the dark theme",
                "when": "${viewport.theme == 'dark'}",
                "colors": {
                    "colorTextPrimary": "#f0f1ef"
                }
            },
            {
                "description": "Standard font sizes",
                "dimensions": {
                    "textSizeBody": 48,
                    "textSizePrimary": 27,
                    "textSizeSecondary": 23,
                    "textSizeSecondaryHint": 25
                }
            },
            {
                "description": "Common spacing values",
                "dimensions": {
                    "spacingThin": 6,
                    "spacingSmall": 12,
                    "spacingMedium": 24,
                    "spacingLarge": 48,
                    "spacingExtraLarge": 72
                }
            },
            {
                "description": "Common margins and padding",
                "dimensions": {
                    "marginTop": 40,
                    "marginLeft": 60,
                    "marginRight": 60,
                    "marginBottom": 40
                }
            }
        ],
        "styles": {
            "textStyleBase": {
                "description": "Base font description; set color",
                "values": [
                    {
                        "color": "@colorTextPrimary"
                    }
                ]
            },
            "textStyleBase0": {
                "description": "Thin version of basic font",
                "extend": "textStyleBase",
                "values": {
                    "fontWeight": "100"
                }
            },
            "textStyleBase1": {
                "description": "Light version of basic font",
                "extend": "textStyleBase",
                "values": {
                    "fontWeight": "300"
                }
            },
            "mixinBody": {
                "values": {
                    "fontSize": "@textSizeBody"
                }
            },
            "mixinPrimary": {
                "values": {
                    "fontSize": "@textSizePrimary"
                }
            },
            "mixinSecondary": {
                "values": {
                    "fontSize": "@textSizeSecondary"
                }
            },
            "textStylePrimary": {
                "extend": [
                    "textStyleBase1",
                    "mixinPrimary"
                ]
            },
            "textStyleSecondary": {
                "extend": [
                    "textStyleBase0",
                    "mixinSecondary"
                ]
            },
            "textStyleBody": {
                "extend": [
                    "textStyleBase1",
                    "mixinBody"
                ]
            },
            "textStyleSecondaryHint": {
                "values": {
                    "fontFamily": "Bookerly",
                    "fontStyle": "italic",
                    "fontSize": "@textSizeSecondaryHint",
                    "color": "@colorTextPrimary"
                }
            }
        },
        "onMount": [],
        "graphics": {},
        "commands": {},
        "layouts": {},
        "mainTemplate": {
            "parameters": [
                "payload"
            ],
            "items": [
                {
                    "when": "${viewport.shape == 'round'}",
                    "type": "Container",
                    "direction": "column",
                    "items": [
                        {
                            "type": "Image",
                            "source": "${payload.bodyTemplate7Data.backgroundImage.sources[0].url}",
                            "scale": "best-fill",
                            "position": "absolute",
                            "width": "100vw",
                            "height": "100vh"
                        },
                        {
                            "type": "AlexaHeader",
                            "headerTitle": "${payload.bodyTemplate7Data.title}",
                            "headerAttributionImage": "${payload.bodyTemplate7Data.logoUrl}"
                        },
                        {
                            "type": "Container",
                            "grow": 1,
                            "alignItems": "center",
                            "justifyContent": "center",
                            "items": [
                                {
                                    "type": "Image",
                                    "source": "${payload.bodyTemplate7Data.image.sources[0].url}",
                                    "scale": "best-fill",
                                    "width": "100vh",
                                    "height": "70vw",
                                    "align": "center"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "height": "100vh",
                    "width": "100vw",
                    "items": [
                        {
                            "type": "Image",
                            "source": "${payload.bodyTemplate7Data.backgroundImage.sources[0].url}",
                            "scale": "best-fill",
                            "position": "absolute",
                            "width": "100vw",
                            "height": "100vh"
                        },
                        {
                            "type": "AlexaHeader",
                            "headerTitle": "${payload.bodyTemplate7Data.title}",
                            "headerAttributionImage": "${payload.bodyTemplate7Data.logoUrl}"
                        },
                        {
                            "type": "Container",
                            "direction": "row",
                            "paddingLeft": "5vw",
                            "paddingRight": "5vw",
                            "paddingBottom": "5vh",
                            "alignItems": "center",
                            "justifyContent": "center",
                            "items": [
                                {
                                    "type": "Image",
                                    "height": "70vh",
                                    "width": "90vw",
                                    "source": "${payload.bodyTemplate7Data.image.sources[0].url}",
                                    "scale": "best-fill",
                                    "align": "center"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "datasources": {
        "bodyTemplate7Data": {
            "type": "object",
            "objectId": "bt7Sample",
            "title": "Today's Daily Photo of Cheese",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://d2o906d8ln7ui1.cloudfront.net/images/BT7_Background.png",
                        "size": "small",
                        "widthPixels": 0,
                        "heightPixels": 0
                    },
                    {
                        "url": "https://d2o906d8ln7ui1.cloudfront.net/images/BT7_Background.png",
                        "size": "large",
                        "widthPixels": 0,
                        "heightPixels": 0
                    }
                ]
            },
            "image": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://d2o906d8ln7ui1.cloudfront.net/images/MollyforBT7.png",
                        "size": "small",
                        "widthPixels": 0,
                        "heightPixels": 0
                    },
                    {
                        "url": "https://d2o906d8ln7ui1.cloudfront.net/images/MollyforBT7.png",
                        "size": "large",
                        "widthPixels": 0,
                        "heightPixels": 0
                    }
                ]
            },
            "logoUrl": "https://d2o906d8ln7ui1.cloudfront.net/images/cheeseskillicon.png",
            "hintText": "Try, \"Alexa, search for blue cheese\""
        }
    }

module.exports = {
    APLHomeCardRequestInterceptor
}