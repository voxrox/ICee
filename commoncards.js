class Commoncards1{

    Commoncard1()
    {
        var card={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [{
                    "type": "Container",
                    "items": [{
                        "type": "TextBlock",
                        "text": "Please select below option",
                        "wrap": true
                    }]
                }],
                "actions": [{
                    "type": "Action.Submit",
                    "title": "Make Insurance Claim",
                    "value" :"Make Insurance Claim"
                            },
                {
                    "type": "Action.Submit",
                    "title": "Get Claim Details",
                    "value":"Make Insurance Claim"
                            }
                        ]
        
            
        
        }
    return card        
    }

    Welcomecard(){
        var welcomeadaptivecard={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [            {
                        "type":"Image",
                        "url":"https://welpmagazine.com/wp-content/uploads/2020/08/BlogFeatureImage-How-Insurance-Companies-Can-Ensure-Customer-Retention-with-ClickDimensions.png"
                    },
                {
                    "type": "Container",
                    "items": [{
                        "type": "TextBlock",
                        "text": "Hello Raghu! Welcome to ICee Chatbot... Please select the preferred language for you support: Hola Raghu! Beinvenido a ICee Chatbot Por favor seleccione el idioma preferido para su apoyo :",
                        "wrap": true
                    }
                    ]
                }],

                "actions": [{
                    "type": "Action.Submit",
                    "title": "English/Ingles",
                    "value": "English"
                            },
                {
                    "type": "Action.Submit",
                    "title": "Spanish/Espanol",
                    "value":"Spanish"
                            }
                        ]
                
        }
        return welcomeadaptivecard
        
    }
}

module.exports.Commoncards1=Commoncards1;
