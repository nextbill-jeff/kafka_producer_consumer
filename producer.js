'use strict'
// let req = require('express');
// let express = req();
// let port = process.env.PORT || 6060;

//     express.listen(port);
let kafka = require('kafka-node');

 async function producerFunc(chunk, topicName, data){
     console.log("*++++++++++++++++++++++++++++++")
      return new Promise(function(resolve,reject){
        try{
            let payloads = [];
            if(chunk === null){
                payloads.push({topic: topicName, messages: JSON.stringify({data : JSON.stringify(data)}) })
                // producerCall(payloads,(res)=>{
                //     console.log("res-------",res);
                //     resolve(res)
                // });
                producerCall(payloads).then((result) => {
                    console.log("payloads++++++",result);  
                    resolve(result);
                  })
            }
            if (chunk !== null){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                payloads.push({ topic: topicName, messages: {chunk : chunk} })
                producerCall(payloads).then((result) => {
                  console.log("payloads--------",result);  
                  resolve(result);
                })
                // producerCall(payloads,()=>{
                //     resolve(res)
                // });
            } 
        }catch (e){
            reject(e)
        }
     })
    
    


    // payloads = [
    //     { topic: topicName, messages: JSON.stringify({data : JSON.stringify(data)}) },
    //     { topic: topicName, messages: {chunk : chunk} }
    // ];
     function producerCall(payloads){
        return new Promise((resolve,reject) => {

            try{
                let HighLevelProducer = kafka.HighLevelProducer;
let client = new kafka.Client();
// let client = new kafka.KafkaClient({kafkaHost: '3.0.197.157:9092'})


let producerClient = new HighLevelProducer(client);
                producerClient.on('ready', function () {
                
                    producerClient.send(payloads, function (err, data) {
                        console.log("producer",data);
                        console.log("error",err);
                resolve(data);
                    });
                    });   
            }catch(e){
                reject(e)
            }
        })
        
        
    }
    
}



module.exports.producerFunc = producerFunc;
