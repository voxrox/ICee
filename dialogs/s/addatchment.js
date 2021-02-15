
const path=require('path')
const uuid=require('uuid')
const axios=require('axios')
var azure= require('azure-storage');

const { BlobServiceClient, BlockBlobClient } = require("@azure/storage-blob");

class addattachment{

    async AddAttachmenttoblob(contentUrl,name)
    {
        var attachmenttype=path.extname(name)
        var id=uuid.v1()
        var j=path.basename(name)
        var s=new Date()
        console.log(s.toUTCString())
        var attachmentname = id.toString() +s+ name;
        var loginstance=axios.create()
        console.log(attachmentname)

        
        var resp=await loginstance.get(contentUrl)
        console.log(resp)
        var storageconnection="DefaultEndpointsProtocol=https;AccountName=drxteststorage;AccountKey=ze8SdwlXRJU5UnRaNINaRSGCQ3IG4fRlP2Nva/6SbNhqhYOAFePs523klszuv70er2hyP9QSwWYn4WojggvZMA==;EndpointSuffix=core.windows.net"
        const blobServiceClient = BlobServiceClient.fromConnectionString(storageconnection);
        const containerClient = blobServiceClient.getContainerClient("drxdevfiles");
        const blockBlobClient = containerClient.getBlockBlobClient(attachmentname);
        console.log(resp.data.length)
        const uploadBlobResponse = await blockBlobClient.upload(resp.data, (resp.data).length);
        console.log(uploadBlobResponse)
        var bloburl=blockBlobClient.url
        //for await (const blob of containerClient.listBlobsFlat()) {
          //  console.log('\t', blob.name);
        //}
        
        return await bloburl


       
        

    }

}

module.exports.addattachment=addattachment;
