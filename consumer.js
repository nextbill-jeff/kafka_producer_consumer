// let req = require('express');
// let express = req();

// let port = process.env.PORT || 6050;

//     express.listen(port);
//     console.log('Server started successfully.. !!! Times- PORT - ' + port + '\n\n\n');
'use strict'
let kafka = require('kafka-node');
let HighLevelConsumer = kafka.HighLevelConsumer;
let client = new kafka.Client();
// let client = new kafka.KafkaClient({kafkaHost: '3.0.197.157:9092'})


async function consumerFunc() {
    let consumer = new HighLevelConsumer(
        client,
        [
            { topic: 'data' },
            {topic : 'chunk'},
        ],
        {
            autoCommit: true,
            autoCommitIntervalMs: 5000,
        }
    );
    console.log("client---",client);
    consumer.on('message', (message) => {
    console.log("message==", JSON.stringify(message.value))
  });
}



    
module.exports.consumerFunc = consumerFunc;