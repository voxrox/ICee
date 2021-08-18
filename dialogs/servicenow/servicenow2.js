const { CardFactory } = require('botbuilder');
const {WaterfallDialog,ComponentDialog, ThisMemoryScope, AttachmentPrompt}=require('botbuilder-dialogs');
const {QnAMaker}  = require('botbuilder-ai');
const{DialogSet,DialogTurnStatus}=require('botbuilder-dialogs');

const{ConfirmPrompt,TextPrompt}=require('botbuilder-dialogs');
const axios=require('axios')
const {ServiceNowattachment}=require('./servicenowattachment')
const {addattachment}=require('../s/addatchment')
const {Translate}=require('../s/translation')
const qnaMaker = new QnAMaker({
    knowledgeBaseId: "ced419d3-b189-448d-8895-44bfe5b782f1",
    endpointKey: "5cfb3b68-4193-4f72-8293-4112c67897f0",
    host: "https://testdata1z.azurewebsites.net/qnamaker"
});


var endDialog=''
var language=''
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
        this.initialstep.bind(this),
        this.initialstep2.bind(this),
        this.initialstep3.bind(this),
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
        language=stateaccessor1.language
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
    async initialstep(step)
    {
        endDialog=false
        var textmsg=await translation.Translationmethod(language,'Please enter your query')
        return await step.prompt(TEXT_PROMPT,textmsg)
    }
    async initialstep2(step)
    {
        var textmsgz=await translation.Translationmethod2(step.result,language)
        step.context.text=textmsgz
        var result =await qnaMaker.getAnswers(step.context)
        if(result[0]==null)
        {
            step.context.sendActivity("I didn't get it,let's proceed further to create ticket")
            return await step.next()   
        }
        else{
        var textmsga=await translation.Translationmethod(language,result[0].answer)
        await step.context.sendActivity(textmsga);
        var textmsgz1=await translation.Translationmethod(language,'Does this answers your query')
        return await step.prompt(CONFIRM_PROMPT,textmsgz1,['Yes','No'])
        }
    }
    async initialstep3(step)
    {
        if(step.result==true)
        {
            endDialog=true
            return await step.endDialog()
        }
        else
        {
            return await step.next()   
        }
    }
    async firststep(step) 
    {  
        
        var textmsg1=await translation.Translationmethod(language,'Please enter summary of the ticket') 
        return await step.prompt(TEXT_PROMPT, textmsg1);    
  
    }

    async getdescription(step)
    {
        step.values.summary=step.result
        var textmsg2=await translation.Translationmethod(language,'Please enter description of the ticket') 
        return await step.prompt(TEXT_PROMPT, textmsg2);    
        
    }

    async getattachment(step){
        step.values.description=step.result
        var textmsg3=await translation.Translationmethod(language,'Do you want to add attachment ?') 
        return await step.prompt(CONFIRM_PROMPT, textmsg3,['Yes','No']);
        
    }

    async getattachment2(step){
        if(step.result==true)
        {
            var textmsg4=await translation.Translationmethod(language,'Please add the attachment for the ticket') 
            return await step.prompt(ATTACHMENT_PROMPT, textmsg4);

        }
        else
        {
            return await step.next()
        }
    }
    async summarystep(step){
        step.values.attachment=step.result
        console.log(step.result)
        var textmsg5=await translation.Translationmethod(language,'Please confirm the summary and description provided by you before creating the ticket') 
        return await step.prompt(CONFIRM_PROMPT, `${textmsg5}:${step.values.summary} \n ,${step.values.description}`,['Yes','No']);
        
    }

    async finalstep(step)
    {
        if(step.result==true){
        var usernamepassword1="Basic YWRtaW46NGV3Q3BZeWU4T1VZ"
        endDialog=true
        var url="https://dev91019.service-now.com/api/now/table/incident"
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
            var textmsg6=await translation.Translationmethod(language,'Ticket has been created in ServiceNow with number')  
            return await step.context.sendActivity(`${textmsg6} ${response.data.result.number}`)
          }
          catch(err){
            var textmsg7=await translation.Translationmethod(language,'Sorry something went wrong please try again')  
            return await step.context.sendActivity(textmsg7)
           
           //return console.log(err)
          }
            
            }
    else{
        endDialog=true
        var textmsg8=await translation.Translationmethod(language,'Cancelled')  
        await step.context.sendActivity(textmsg8 )
        return await step.endDialog()
    }
    }

    async isDialogComplete(){
        return endDialog;
    }
}

module.exports.Servicenow2=Servicenow2;
