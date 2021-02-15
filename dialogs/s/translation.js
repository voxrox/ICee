class Translate {
    Translationmethod(language,text)
    {
        var apikey="2936ffbe1b80431a99e92d99cbb247e6"
        endDialog=true
        var url="https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to="+language
        var contentType='application/json'
        var loginstance = axios.create();
        loginstance.defaults.headers.common['Content-Type']=contentType
        loginstance.defaults.headers.common['Accept']=contentType
        loginstance.defaults.headers.common['Ocp-Apim-Subscription-Key']=apikey
        loginstance.defaults.headers.common['Ocp-Apim-Subscription-Region']="centralindia"
        var body={ "Text": text}
        try{
            var response=loginstance.post(url,body)
            
            
            console.log(response)


          }
          catch(err){
           return "error"
          }
    }
}



module.exports.Translate=Translate;