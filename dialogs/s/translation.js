const axios=require('axios')

class Translate {
    async Translationmethod(language,text)
    {
        if(language=="English/Ingles"){
            language="en"
        }
        else{
            language="es"
        }

var data = JSON.stringify([{"Text":text}]);

var config = {
  method: 'post',
  url: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to='+language,
  headers: { 
    'Ocp-Apim-Subscription-Key': '2936ffbe1b80431a99e92d99cbb247e6', 
    'Ocp-Apim-Subscription-Region': 'centralindia', 
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
  },
  data : data
};
try{
var response=await axios(config)
return response.data[0].translations[0].text

}
catch(err){
  console.log('oops! something went wrong')
}
}

async Translationmethod2(text,language)
    {
        if(language=="English/Ingles"){
            language="en"
        }
        else{
            language="es"
        }

var data = JSON.stringify([{"Text":text}]);

var config = {
  method: 'post',
  url: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from='+language+'&to=en',
  headers: { 
    'Ocp-Apim-Subscription-Key': '2936ffbe1b80431a99e92d99cbb247e6', 
    'Ocp-Apim-Subscription-Region': 'centralindia', 
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
  },
  data : data
};
try{
var response=await axios(config)
return response.data[0].translations[0].text

}
catch(err){
  console.log('oops! something went wrong')
}
}
}


module.exports.Translate=Translate;
