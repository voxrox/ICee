const string1="If you want to request timeoff or check timeoff details , select TimeOff  option under Applications"

const { CardFactory } = require('botbuilder');
const {WaterfallDialog,ComponentDialog, ThisMemoryScope}=require('botbuilder-dialogs');

const{DialogSet,DialogTurnStatus}=require('botbuilder-dialogs');

const{ConfirmPrompt,TextPrompt}=require('botbuilder-dialogs');
const axios=require('axios')
const{Welcomecard}=require('./cards')





var endDialog=''
var setlanguage=''

const WATERFALL_DIALOG='WATERFALL_DIALOG';
const CONFIRM_PROMPT='CONFIRM_PROMPT';
const TEXT_PROMPT='TEXT_PROMPT';

class Welcomemessage extends ComponentDialog{
    
}

module.exports.Welcomemessage=Welcomemessage;