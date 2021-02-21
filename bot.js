// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//j
const { ActivityHandler,MessageFactory,CardFactory } = require('botbuilder');
const { ThisMemoryScope } = require('botbuilder-dialogs');
const{Servicenow}=require('./dialogs/servicenow/servicenow')
const{Servicenow2}=require('./dialogs/servicenow/servicenow2')
const{Commoncards1}=require('./commoncards')
const {LuisRecognizer}  = require('botbuilder-ai');
const{Translate}=require('./dialogs/s/translation')
class ABot extends ActivityHandler {
    constructor(conversationstate,userstate) {
       
        super();
        this.conversationstate=conversationstate
        this.userstate=userstate
        this.dialogstate=this.conversationstate.createProperty("dialogState")

        const dispatchRecognizer = new LuisRecognizer({
            applicationId: "def9a587-d23a-4ee6-9ee3-a857d92858a4",
            endpointKey: "8cbb9fbcced74302b388455f637de641",
            endpoint: "https://eastus.api.cognitive.microsoft.com"
        }, {
            includeAllIntents: true
        }, true);
        
        this.servicenow=new Servicenow(this.conversationstate,this.userstate)
        this.servicenow2=new Servicenow2(this.conversationstate,this.userstate)
        this.commoncard=new Commoncards1()

        this.previousIntent = this.conversationstate.createProperty("previousIntent");
        this.conversationData = this.conversationstate.createProperty('conservationData');
        
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) 
                {
                    await context.sendActivity({attachments: [CardFactory.adaptiveCard(this.commoncard.Welcomecard2())]});
                    return context.sendActivity(this.commoncard.Welcomecard1())
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            //await next();
        });
        
        this.onDialog(async (context, next) => 
        {
            // Save any state changes. The load happened during the execution of the Dialog.
            await this.conversationstate.saveChanges(context, false);
            await this.userstate.saveChanges(context, false);
            await next();
        });  

        this.onMessage(async (context,next)=>{
            var translation=new Translate()
            const dialogstate1=await this.dialogstate.get(context,{})
            if(context.activity.text==("English/Ingles"))
            {
                dialogstate1.language=context.activity.text
                await this.conversationstate.saveChanges(context, false);
                await context.sendActivity(await translation.Translationmethod(dialogstate1.language,"Please type 'Get Ticket Details' or 'Create Ticket' in your own words to proceed further"))
            }
            else if(context.activity.text==("Spanish/Espanol"))
            {
                dialogstate1.language=context.activity.text
                await this.conversationstate.saveChanges(context, false);
                await context.sendActivity(await translation.Translationmethod(dialogstate1.language,"Please type 'Get Ticket Details' or 'Create Ticket' in your own words to proceed further"))

            }
            else
            {
            
            context.activity.text=await translation.Translationmethod2(context.activity.text,dialogstate1.language)
            const luisResult = await dispatchRecognizer.recognize(context)
            const intent = LuisRecognizer.topIntent(luisResult); 
            await this.messageactivity(context,intent)
            await next()
            }
        })
    }
    
     
    
    async messageactivity(context,intent)
    {
        var currentIntent = '';
        var translation1=new Translate()
        const previousIntent = await this.previousIntent.get(context,{});
        const conversationData = await this.conversationData.get(context,{});
        const dialogstate2=await this.dialogstate.get(context,{})
        
        if(previousIntent.intentName && conversationData.endDialog === false )
        {
           currentIntent = previousIntent.intentName;

        }
        else if (previousIntent.intentName && conversationData.endDialog === true)
        {
             currentIntent = intent;

        }

        
        else
        {
            currentIntent = intent;
            await this.previousIntent.set(context,{intentName: intent});
           // await this.testproperty.set(context,{})

        }
        
        switch(currentIntent.toLowerCase())
        {

                case "getticket":
                    await this.servicenow.run(context,this.dialogstate,dialogstate2)
                    conversationData.endDialog = await this.servicenow.isDialogComplete();
                    
                    if(conversationData.endDialog)
                    {
                    
                        await this.previousIntent.set(context,{intentName: null});
                        this.dialogstate.set(context,{language: null});
                        context.sendActivity(this.commoncard.Welcomecard1())
            
                    }
                break
                    case "createticket":
                        await this.servicenow2.run(context,this.dialogstate,dialogstate2)
                    conversationData.endDialog = await this.servicenow2.isDialogComplete();
                    if(conversationData.endDialog)
                    {
                    
                        await this.previousIntent.set(context,{intentName: null});
                        this.dialogstate.set(context,{language: null});
                        await context.sendActivity(this.commoncard.Welcomecard1())
                    }
            break
            
            default:
                //await context.sendActivity("hello, sorry i cannot understand")
                await context.sendActivity(translation1.Translationmethod(dialogstate2.language,"Please type 'Get Ticket Details' or 'Create Ticket' in your own words to proceed further"))
            break
        }
    }
}

module.exports.ABot = ABot;
