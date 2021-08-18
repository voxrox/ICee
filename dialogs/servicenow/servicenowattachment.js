const axios=require('axios')
class ServiceNowattachment
{
    async getdata(documenturl)
    {
       
            //var contentType="application/json"
            var loginstance = axios.create();
            //loginstance.defaults.headers.common['Content-Type']=contentType
            try{
                var response=await loginstance.get(documenturl)
                return response.data
                
              }
              catch(err){
               return console.log("something went wrong please check1")
              }
    }

    async IncidentAttachmentdw(incidentsysid,documentname,contentdata,documenttype)
    {
        var usernamepassword1="Basic YWRtaW46NGV3Q3BZeWU4T1VZ"
        var url="https://dev91019.service-now.com/api/now/attachment/file?table_name=incident&table_sys_id="+incidentsysid+"&file_name="+documentname
        var contentType=documenttype
        var loginstance = axios.create();
        loginstance.defaults.headers.common['Content-Type']=contentType
        loginstance.defaults.headers.common['Authorization']=usernamepassword1

  

        //body=JSON.stringify(body)
        try{
            var response12=await loginstance.post(url,"dwadaw")
        console.log(response12)
            
            console.log("done")
          }
          catch(err){
           console.log("Sorry, something went wrong.Please check11")
           console.log(err)
           return await console.log("done")
          }
            

    }

    async IncidentAttachment(incidentsysid,documentname,contentdata,documenttype)
    {
        var axios = require('axios');
var data = contentdata;

var config = {
  method: 'post',
  url: 'https://dev91019.service-now.com/api/now/attachment/file?table_name=incident&table_sys_id='+incidentsysid+'&file_name='+documentname,
  headers: { 
    'Authorization': 'Basic YWRtaW46NGV3Q3BZeWU4T1VZ', 
    'Content-Type': documenttype, 
    'Cookie': 'glide_user_route=glide.c281e10044e269a6a099f08d79b8b21e; BIGipServerpool_dev61713=2827245322.4929.0000; glide_user_activity=U0N2MzpXOU94a3pYM0VDNTVPR1RCZTY4eDJMVytTWitCQmlBZDo3Y0M2b2RDZytiTUJRdE5Jczdsc2NnbSt5NU91a1R0enZ0Z3FsWEYyYXB3PQ==; JSESSIONID=BB393E69A56BD84DA98CD1A759E33384; glide_session_store=2F0B8B92071220108472FD908C1ED061'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

    }
}

module.exports.ServiceNowattachment=ServiceNowattachment;
