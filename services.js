'use strict'
const fs = require('fs');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const gridfs = require('mongoose-gridfs');
// let config = require('./config')
let filesSchema = require('./filesSchema')
let chunksSchema = require('./chunksSchema')
let kafkaProducer = require('./producer')

const { model: Attachment } = gridfs({
    collection: 'attachments',
    model: 'Attachment',
  });

async function putMongo() {
    const readStream = fs.createReadStream('video');
    const attachment = new Attachment({
      filename: 'video',
      contentType: 'video/3gpp'
    });
    attachment.write(readStream, (error, attachment) => {
        console.log("error===",JSON.stringify(error))
        console.log("attachment===",JSON.stringify(attachment))
       readMongo(attachment._id)
     });
}

// async function fetchMongo(id) {
//     const readStream = Attachment.readById(id);                          //TODO To check whether the file saved is being read.
//     readStream.on('error', (error)=> {
//         console.log("error",error)
//     });
//     readStream.on('data', (data) => {
//         console.log("data===",data);
//     });
//     console.log("readStream----",readStream)
// }


async function readMongo(id) {
    console.log("id",id);
    try{
        let filesData = await filesSchema.findOne({"_id" : ObjectId(id)})
        //console.log("files==",files)
        let videoInChunks= await chunksSchema.find({files_id : id});
         sendDataToConsumer(filesData,videoInChunks)
        //console.log("chunks==",chunks)
    }catch(e){
        console.log("error",e)
    }

}

  async function sendDataToConsumer(filesData,videoInChunks){
    try {
           
    } catch (e) {

    }
  }



module.exports.putMongo = putMongo;
// module.exports.fetchMongo = fetchMongo;
