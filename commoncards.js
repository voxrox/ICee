const { MessageFactory, CardFactory } = require('botbuilder');
const {Translate}=require('./dialogs/s/translation')

class Commoncards1{
    Welcomecardioio2(){

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

    Welcomecard2(){
        var welcomeadaptivecard={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [            {
                        "type":"Image",
                        "url":"https://blog.vsoftconsulting.com/hubfs/Incident-management_Blog.jpg"
                    },
                {
                    "type": "Container",
                    "items": [{
                        "type": "TextBlock",
                        "text": "Hi!, Welcome to ITSM Chatbot/Hola! Bienvenido a ITSM Chatbot",
                        "wrap": true,
                        "size": "medium"
                    }
                    ]
                }]
                
        }
        return welcomeadaptivecard
    }
        Welcomecard1123()
        {
            var reply = MessageFactory.suggestedActions(['English/Ingles','Spanish/Espanol'],'Please select preferred language/Seleccione el idioma preferido');
            return reply;
        }
        
    Welcomecard2e2qe(){
        var kurise={
            "contentType": "application/vnd.microsoft.card.thumbnail",
            "content": {
              "title": "Bender",
              "subtitle": "tale of a robot who dared to love",
              "text": "Bender Bending Rodríguez is a main character in the animated television series Futurama. He was created by series creators Matt Groening and David X. Cohen, and is voiced by John DiMaggio",
              "images": [
                {
                  "url": "https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png",
                  "alt": "Bender Rodríguez"
                }
              ],
              "buttons": [
                {
                  "type": "imBack",
                  "title": "Thumbs Up",
                  "image": "http://moopz.com/assets_c/2012/06/emoji-thumbs-up-150-thumb-autox125-140616.jpg",
                  "value": "I like it"
                },
                {
                  "type": "imBack",
                  "title": "Thumbs Down",
                  "image": "http://yourfaceisstupid.com/wp-content/uploads/2014/08/thumbs-down.png",
                  "value": "I don't like it"
                },
                {
                  "type": "openUrl",
                  "title": "I feel lucky",
                  "image": "http://thumb9.shutterstock.com/photos/thumb_large/683806/148441982.jpg",
                  "value": "https://www.bing.com/images/search?q=bender&qpvt=bender&qpvt=bender&qpvt=bender&FORM=IGRE"
                }
              ],
              "tap": {
                "type": "imBack",
                "value": "Tapped it!"
              }
            }
          }
          return kurise
    }

    Welcomecard1()
    {

        const card = CardFactory.heroCard(
            'Please select language/Por favor seleccione idioma',
            ['https://ps.w.org/google-language-translator/assets/icon-256x256.png'],
            ['English/Ingles','Spanish/Espanol'],

       );
       const message = MessageFactory.attachment(card);

       
       return  message
    }
   
    async commoncard1(language,context)
    {
        const translate =new Translate()
        
        var text1=await translate.Translationmethod(language,'Please select any option to proceed further')
        var text2=await translate.Translationmethod(language,'Create Ticket')
        var text3=await translate.Translationmethod(language,'Get Ticket Details')
        return await this.commoncard2(text1,text2,text3,context)
    }
    async commoncard2(text1,text2,text3,context)
    {

        const card =await CardFactory.heroCard(
            'Please select any option to proceed further',
            ['https://'],
            ['Create Ticket','Get Ticket Details'],

       );
       const message = MessageFactory.attachment(card);

       
       return  await context.SendActivity(message)
    }

    Welcomecard176() {
        return CardFactory.heroCard(
            'BotFramework Hero Carddddddddddddddddddddddddddddddddddddddddd',
            //wrap=true,
            
            CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
            CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'Get started',
                    value: 'https://docs.microsoft.com/en-us/azure/bot-service/'
                }
            ])

        );
    }
}

module.exports.Commoncards1=Commoncards1;
