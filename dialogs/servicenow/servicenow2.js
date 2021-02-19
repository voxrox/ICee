const { CardFactory } = require('botbuilder');
const {WaterfallDialog,ComponentDialog, ThisMemoryScope, AttachmentPrompt}=require('botbuilder-dialogs');

const{DialogSet,DialogTurnStatus}=require('botbuilder-dialogs');

const{ConfirmPrompt,TextPrompt}=require('botbuilder-dialogs');
const axios=require('axios')
const {ServiceNowattachment}=require('./servicenowattachment')
const {addattachment}=require('../s/addatchment')
const {Translate}=require('../s/translation')



var endDialog=''
var text1='Please enter summary of the ticket'
var text2='Please enter description of the ticket'
var text3='Do you want to add attachment ?'
var text4='Please add the attachment for the ticket'
var text5='Please confirm the summary and description provided before creating the ticket'
var text6='Ticket has been created in ServiceNow with number'
var text7='Sorry, something went wrong.Please try again'
var text8='Cancelled'
var testyes='Yes'
var testno='No'

var translation=new Translate()



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

    async run(turncontext,stateaccessor,stateaccessor1){
        text1=await translation.Translationmethod(stateaccessor1.language,text1)
        text2=await translation.Translationmethod(stateaccessor1.language,text2)
        text3=await translation.Translationmethod(stateaccessor1.language,text3)
        text4=await translation.Translationmethod(stateaccessor1.language,text4)
        text5=await translation.Translationmethod(stateaccessor1.language,text5)
        text6= await translation.Translationmethod(stateaccessor1.language,text6)
        text7=await translation.Translationmethod(stateaccessor1.language,text7)
        text8=await translation.Translationmethod(stateaccessor1.language,text8)
        testyes=await translation.Translationmethod(stateaccessor1.language,testyes)
        testno=await translation.Translationmethod(stateaccessor1.language,testno)
        const dialogSet=new DialogSet(stateaccessor);
        dialogSet.add(this);
        const dialogcontext=await dialogSet.createContext(turncontext);
        if(turncontext.activity.text=='quit'){await dialogcontext.endDialog(this.id)
        endDialog=true}
        else if(turncontext.activity.text=='cancel' ){await dialogcontext.endDialog(this.id)
            endDialog=true}
        else{
        const results=await dialogcontext.continueDialog();
        if(results.status==DialogTurnStatus.empty){
            await dialogcontext.beginDialog(this.id);
        }
    }

    }
    
    async firststep(step) 
    {  
        endDialog=false     
        return await step.prompt(TEXT_PROMPT, text1);
    }

    async getdescription(step)
    {
        step.values.summary=step.result
        return await step.prompt(TEXT_PROMPT,text2)
    }

    async getattachment(step){
        step.values.description=step.result
        return await step.prompt(CONFIRM_PROMPT,text3,[testyes,testno])
    }

    async getattachment2(step){
        if(step.result==true)
        {
            return await step.prompt(ATTACHMENT_PROMPT,text4)

        }
        else
        {
            return await step.next()
        }
    }
    async summarystep(step){
        step.values.attachment=step.result
        console.log(step.result)
        return await step.prompt(CONFIRM_PROMPT,`${text5}:${step.values.summary} \n ,${step.values.description}`,[testyes,testno])
    }

    async finalstep(step)
    {
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
            //console.log(response)
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
            return await step.context.sendActivity(`${text6} ${response.data.result.number}`)
          }
          catch(err){
           return await step.context.sendActivity(text7)
           //return console.log(err)
          }
            
            }
    else{
        endDialog=true
        await step.context.sendActivity(text8)
        return await step.endDialog()
    }
    }

    async isDialogComplete(){
        return endDialog;
    }
}

module.exports.Servicenow2=Servicenow2;