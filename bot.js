// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler,MessageFactory,CardFactory } = require('botbuilder');
const { ThisMemoryScope } = require('botbuilder-dialogs');
const{Servicenow}=require('./dialogs/servicenow/servicenow')
const{Servicenow2}=require('./dialogs/servicenow/servicenow2')
const{Commoncards1}=require('./commoncards')
class ABot extends ActivityHandler {
    constructor(conversationstate,userstate) {

        super();
        this.conversationstate=conversationstate
        this.userstate=userstate
        this.dialogstate=this.conversationstate.createProperty("dialogState")
        
        this.servicenow=new Servicenow(this.conversationstate,this.userstate)
        this.servicenow2=new Servicenow2(this.conversationstate,this.userstate)
        this.commoncard=new Commoncards1()

        this.previousIntent = this.conversationstate.createProperty("previousIntent");
        this.conversationData = this.conversationstate.createProperty('conservationData');
        //this.userstateproperty=this.conversationstate.createProperty("userstateproperty")
        
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
await context.sendActivity(this.commoncard.Welcomecard1());
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            //await next();
        });
        
        this.onDialog(async (context, next) => {
            // Save any state changes. The load happened during the execution of the Dialog.
            await this.conversationstate.saveChanges(context, false);
            await this.userstate.saveChanges(context, false);
            await next();
        });  

        this.onMessage(async (context,next)=>{
            if(context.activity.text==('English/Ingles'||'Spanish/Espanol')){
                //this.dialogstate.set(context,{language: context.activity.text});
await context.sendActivity(this.commoncard.commoncard1());
                

            }


            else
            {
            await this.messageactivity(context)
            await next()
            }
        })
    }



    async welcomemessage(context)
    {
        const message="welcome to HR bot, Here you can query on HR related issues."
        await context.sendActivity(message)

    }

    async messageactivity(context)
    {
        var currentIntent = '';
        const previousIntent = await this.previousIntent.get(context,{});
        const conversationData = await this.conversationData.get(context,{});
 
        
        if(previousIntent.intentName && conversationData.endDialog === false )
 
        {
            
            //if there is previous intent and if there are is no end
           currentIntent = previousIntent.intentName;

        }
        else if (previousIntent.intentName && conversationData.endDialog === true)
        {
             currentIntent = context.activity.text;

        }

        else 
        {
            currentIntent = context.activity.text;
            await this.previousIntent.set(context,{intentName: context.activity.text});

        }

        
        switch(currentIntent.toLowerCase())
        {

                case "get claim details":
                    await this.servicenow.run(context,this.dialogstate)
                    conversationData.endDialog = await this.servicenow.isDialogComplete();
                    
                    if(conversationData.endDialog)
                    {
                    
                        await this.previousIntent.set(context,{intentName: null});
                        //await this.dialogstate.set(context,{language: null});
await context.sendActivity(this.commoncard.Languagecard());
            
                    }
                break
                    case "create claim":
                        await this.servicenow2.run(context,this.dialogstate)
                    conversationData.endDialog = await this.servicenow2.isDialogComplete();
                    if(conversationData.endDialog)
                    {
                    
                        await this.previousIntent.set(context,{intentName: null});
                        //await this.dialogstate.set(context,{language: null});
await context.sendActivity(this.commoncard.Languagecard());
            
                    }

            
            break
                   case "hi":
                    await context.sendActivity("Welcome to ICee Bot");

                break

           

            
            default:
                await context.sendActivity("hello, sorry i cannot understand")
                await context.sendActivity(this.commoncard.Languagecard());
            break
        }
    }
}

module.exports.ABot = ABot;
