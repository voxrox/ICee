const { CardFactory } = require('botbuilder');
const {WaterfallDialog,ComponentDialog, ThisMemoryScope}=require('botbuilder-dialogs');

const{DialogSet,DialogTurnStatus}=require('botbuilder-dialogs');

const{ConfirmPrompt,TextPrompt}=require('botbuilder-dialogs');
const axios=require('axios')
const {Adaptivecardss}=require('./adaptivecard1')
const{Translate}=require('../s/translation');
const { Commoncards1 } = require('../../commoncards');

var translation=new Translate()

var endDialog=''
var language=''


const WATERFALL_DIALOG='WATERFALL_DIALOG';
const CONFIRM_PROMPT='CONFIRM_PROMPT';
const TEXT_PROMPT='TEXT_PROMPT';

class Servicenow extends ComponentDialog{
    constructor(conversationstate,userstate){
        super('servicenow')

        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new TextPrompt(TEXT_PROMPT));
    
    this.addDialog(new WaterfallDialog(WATERFALL_DIALOG,[
        this.firststep.bind(this),
        this.getticketdetails.bind(this)
        
        
    ]))

    this.initialDialogId=WATERFALL_DIALOG;
    }

    async run(turncontext,stateaccessor,stateaccessor1){
        language=stateaccessor1.language
        const dialogSet=new DialogSet(stateaccessor);
        dialogSet.add(this);
        const dialogcontext=await dialogSet.createContext(turncontext);
        
        if(turncontext.activity.text=='quit' ){await dialogcontext.endDialog(this.id)
            endDialog=true}
        else  if(turncontext.activity.text=='cancel' ){await dialogcontext.endDialog(this.id)
                endDialog=true}
        else if(!turncontext.activity.text){await dialogcontext.continueDialog()}
            else{
        const results=await dialogcontext.continueDialog();
        if(results.status==DialogTurnStatus.empty){
            await dialogcontext.beginDialog(this.id);
        }
    }

    }

    async firststep(step) {  
        endDialog=false    
        var textmsg1=await translation.Translationmethod(language,'Please enter ticket number') 
        return await step.prompt(TEXT_PROMPT, textmsg1);
    }

    async getticketdetails(step){
        console.log(step)
        var usernamepassword1="Basic YWRtaW46VXhMcEkwdWd4R0Yx"
        var incident=step.result
        
        var url="https://dev61713.service-now.com/api/now/table/incident?sysparm_query=number%3D"+incident+"&sysparm_limit=1"
        var contentType='application/json'
        var loginstance = axios.create();
        loginstance.defaults.headers.common['Content-Type']=contentType
        loginstance.defaults.headers.common['Authorization']=usernamepassword1
  

        try{
            var response=await loginstance.get(url)
            var state=response.data.result[0].state
            var description=response.data.result[0].description
            var shortdescription=response.data.result[0].short_description 
            var incidentno=response.data.result[0].number
            var openedat=response.data.result[0].opened_at
            const card1=new Adaptivecardss()
            
            var card123=card1.adaptivecard1(state,description,incidentno,openedat,shortdescription)
            endDialog=true
            if(description!=''){card123=JSON.parse(card123)}
            return await step.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(JSON.parse(card123))]
            });
          }
          catch(err){
            endDialog=true
            var textmsg2=await translation.Translationmethod(language,'Please enter valid ticket number') 
           return await step.context.sendActivity(textmsg2)
           //return console.log(err)
          }
        
//return await step.context.sendActivity(response);
    }


    async isDialogComplete(){

        return endDialog;
    }
}
module.exports.Servicenow=Servicenow;
