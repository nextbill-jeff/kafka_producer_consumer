'use strict'
// let req = require('express');
// let express = req();
// let port = process.env.PORT || 6060;

//     express.listen(port);
//     console.log('Server started successfully.. !!! Times- PORT - ' + port + '\n\n\n');
let kafka = require('kafka-node');
let HighLevelProducer = kafka.HighLevelProducer;
let client = new kafka.Client();
let producer = new HighLevelProducer(client),



async function producer(){
    payloads = [
        { topic: 'videoData', messages: JSON.stringify({a : 'hi', b : 'world'}) },
        { topic: 'videoData',partition: 1, messages: ['hello', 'world'] }
    ];
    producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log("producer",data);
        console.log("error",err);

    });
    });
}



module.exports.producer = producer;
