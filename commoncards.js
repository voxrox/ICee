const { MessageFactory, CardFactory } = require('botbuilder');
class Commoncards1{
    Commoncard1778(){

       var g= {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
              "title": "Seattle Center Monorail",
              "subtitle": "Seattle Center Monorail",
              "text": "The Seattle Center Monorail is an elevated train line between Seattle Center (near the Space Needle) and downtown Seattle. It was built for the 1962 World's Fair. Its original two trains, completed in 1961, are still in service.",
              "images": [
                {
                  "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Seattle_monorail01_2008-02-25.jpg/1024px-Seattle_monorail01_2008-02-25.jpg"
                }
              ],
             "buttons": [
               {
                  "type": "openUrl",
                  "title": "Official website",
                  "value": "https://www.seattlemonorail.com"
                },
               {
                 "type": "openUrl",
                 "title": "Wikipeda page",
                 "value": "https://en.wikipedia.org/wiki/Seattle_Center_Monorail"
                }
              ]
            }
         }
         return g
    }
    Commoncard231()
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
                    "Data" :"Make Insurance Claim"
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

    Welcomecard123(){
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

    Welcomecard1()
    {
        const card = CardFactory.heroCard(
            'Welcome to ICee Bot, Please select preferred language',
            ['https://welpmagazine.com/wp-content/uploads/2020/08/BlogFeatureImage-How-Insurance-Companies-Can-Ensure-Customer-Retention-with-ClickDimensions.png'],
            ['English/Ingles','Spanish/Espanol']
       );
       const message = MessageFactory.attachment(card);
       return  message
    }

    commoncard1()
    {
        const card = CardFactory.heroCard(
            'Please select any option to proceed further',
            ['https://wallpaperaccess.com/full/1556608.jpg'],
            ['Create Claim','Get Claim Details']
       );
       const message = MessageFactory.attachment(card);
       return  message
    }
}

module.exports.Commoncards1=Commoncards1;
