import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();



//const superchats = require("superchats");
import superchats from "superchats";
import request from "request";


import natural from "natural";


//const natural = require('natural');



const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
    apiKey: process.env.OPENAI_API_KEY,
});

//const request = require("request");
//const { req } = request;


  ////////////// CHATBOT SUPERCHAT
  async function start(){
        var id_user = 36; 
        var id_cliente = 31; 
        let client = await superchats.create({
            session: "AI-Itatim",
            license: "QKQ0ZDOOGO-XLQQJKW82M-LJSAHROR3Q-MQ4M107WUN",
            nodata: true,
            welcomeScreen: true, // Show or hide welcome in terminal
            retries: 3, // Number of connection attempts,
            nodata: true, // It doesn't get the entire history of the device (default = true) 
            logQr: true, // (Default is true) Logs QR automatically in terminal
            qrcode: (base64QR, asciiQR, urlCode) => {
                
            
            },
            statusFind: async (status) => {
                //console.log(status)

                if(status.response == "isConnected"){
                    
                    console.log("Conectado");

                }

                if(status.response == "notLogged"){
                    
                    console.log(status[0]);


                }
            },
            onAck: (event) => {
                console.log(event);


            },
            onPresence: (event) => {
                console.log(event)
            },
            onMessage: async (message) => {
                //return false;
                console.log("OK 1"); 
                console.log(message);
                var id_produto = 5555;
                var id_msg_whats = message.id;
                //var id_cliente = 0;

                ///console.log(message.device);
                console.log(message);
                
               // ################################ START ###################################################
                



            } // xxxxxxxxxxxxxxxxxxx onMessage

        }) // x create


    return client;

} // x start

(async function(){
  let client = await start();
    //let response = await client.sendText('0000000000000', 'Thanks for using Superchats!!!')
    //console.log(response)

 


})(

)


 