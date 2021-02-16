const string1="If you want to request timeoff or check timeoff details , select TimeOff  option under Applications"

const { CardFactory } = require('botbuilder');
const {WaterfallDialog,ComponentDialog, ThisMemoryScope, AttachmentPrompt}=require('botbuilder-dialogs');

const{DialogSet,DialogTurnStatus}=require('botbuilder-dialogs');

const{ConfirmPrompt,TextPrompt}=require('botbuilder-dialogs');
const axios=require('axios')
const {ServiceNowattachment}=require('./servicenowattachment')
const {addattachment}=require('../s/addatchment')



var endDialog=''

const WATERFALL_DIALOG='WATERFALL_DIALOG';
const CONFIRM_PROMPT='CONFIRM_PROMPT';
const TEXT_PROMPT='TEXT_PROMPT';
const ATTACHMENT_PROMPT='ATTACHMENT_PROMPT';

class Servicenow2 extends ComponentDialog{
    constructor(conversationstate,userstate){
        super('servicenow2')
    
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new AttachmentPrompt(ATTACHMENT_PROMPT));
    
    this.addDialog(new WaterfallDialog(WATERFALL_DIALOG,[
        this.firststep.bind(this),
        this.getdescription.bind(this),
        this.getattachment.bind(this),
        this.getattachment2.bind(this),
        this.summarystep.bind(this),
        this.finalstep.bind(this)
        
    ]))

    this.initialDialogId=WATERFALL_DIALOG;
    }

    async run(turncontext,stateaccessor){
        const dialogSet=new DialogSet(stateaccessor);
        dialogSet.add(this);

        const dialogcontext=await dialogSet.createContext(turncontext);
        
        if(turncontext.activity.text=='quit'){await dialogcontext.endDialog(this.id)
        endDialog=true}
        else  if(turncontext.activity.text=='cancel' ){await dialogcontext.endDialog(this.id)
            endDialog=true}
        
        else{
        const results=await dialogcontext.continueDialog();
        if(results.status==DialogTurnStatus.empty){
            await dialogcontext.beginDialog(this.id);
        }
    }

    }

    async firststep(step) {  
        endDialog=false     
        return await step.prompt(TEXT_PROMPT, 'Please enter summary of the claim');
        

    }

    async getdescription(step){
        step.values.summary=step.result
        return await step.prompt(TEXT_PROMPT,'Please enter description of the claim')
        
    }

    async getattachment(step){
        step.values.description=step.result
        return await step.prompt(CONFIRM_PROMPT,'Do you want to add attachment ?',['Yes','No'])
        
    }

    async getattachment2(step){
        if(step.result==true)
        {
            return await step.prompt(ATTACHMENT_PROMPT,'Please add the attachment for the claim')

        }
        else{
            return await step.next()
        }
        
    }
    async summarystep(step){
        step.values.attachment=step.result
        //console.log(step.result)
        return await step.prompt(CONFIRM_PROMPT,`Please confirm claim with summary:${step.values.summary},Description : ${step.values.description}`,['Yes','No'])
    }

    async finalstep(step){
        if(step.result==true){
        var usernamepassword1="Basic YWRtaW46VXhMcEkwdWd4R0Yx"
        endDialog=true
        var url="https://dev61713.service-now.com/api/now/table/incident"
       
        var contentType='application/json'
        var loginstance = axios.create();
        loginstance.defaults.headers.common['Content-Type']=contentType
        loginstance.defaults.headers.common['Authorization']=usernamepassword1
    
        
  
        var body={}
        body.summary=step.values.summary
        body.short_description=step.values.description
        
        if(step.values.attachment){
            const addingtoblob=new addattachment()
        var bloburl=await addingtoblob.AddAttachmenttoblob(step.values.attachment[0].contentUrl,step.values.attachment[0].name)
        body.description=bloburl}
        body=JSON.stringify(body)
        try{
            var response=await loginstance.post(url,JSON.parse(body))
            //console.log(step.values.attachment)

            
            
            var incidentsysid=response.data.result.sys_id
           
            
            
            //return await IncidentAttachment(sysid,textname,texttype,contentdata)
            if(step.values.attachment){
            var sattachment=new ServiceNowattachment()
            
            
            var documentname=step.values.attachment[0].name
            var documenttype=step.values.attachment[0].contentType
            var documenturl=step.values.attachment[0].contentUrl
            var contentdata=await sattachment.getdata(documenturl)
            await sattachment.IncidentAttachment(incidentsysid,documentname,contentdata,documenttype)
            }
            return await step.context.sendActivity(`Claim has been created with number ${response.data.result.number} in ServiceNow`)
          }
          catch(err){
           return await step.context.sendActivity("Sorry, something went wrong.Please try again")
           //return console.log(err)
          }
            
            }
    else{
        endDialog=true
        return await step.context.sendActivity("Cancelled")
        //return await step.endDialog()
        
    }
        

    }

    async isDialogComplete(){
        return endDialog;
    }
}

module.exports.Servicenow2=Servicenow2;
