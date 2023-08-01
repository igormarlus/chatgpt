// JQUERY
//import * as request from 'request';
//import * as requests from 'requests';
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import * as $ from 'Jquery';
import * as fs from 'fs';
//import * as requests from 'requests';
//import { Request, get } from "requests";
//const { Request, get } = require('request');

dotenv.config();

//var request = require('requests');

//import {get , post}  from 'requests';

//const superchats = require("superchats");

const express = require('express');
//const fs = require("fs");
//import  * as express from 'express';
/*
const https = require("https");

const express = require("express");
const app = express();
*/
import * as superchats from 'superchats';
const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
    apiKey: process.env.OPENAI_API_KEY,
});

// Configure o seu servidor aqui.
//var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/10/";
var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/558183276882/10/";

// definir os parâmetros da solicitação
/*
const options = {
    url: url_endpoint,
    method: 'POST',
    body: {'whats': 'John', 'nivel': 30},
    json: true
};

// enviar a solicitação
const post = request.(options, function(error, response, body) {
    // aqui você pode manipular a resposta 
    console.log(error);
});
*/
//const openai = new OpenAIApi(configuration);

//var q = "Qual a boa de hoje";
// BASE

//var q = "Classify the sentiment in these tweets:\n\n1. \"Eu gosto de ir a praia\"\n2. \"Muito ruim isso 😠\"\n3. \"Eu espero o carnaval!!!\"\n4. \"Adoro meu gato ❤️❤️\"\n5. \"Odeio calabresa\"\n\nTweet sentiment ratings:"; // sentinento no por frase( twetter)
/*
  const response = await openai.createCompletion({
    model: "text-davinci-003", // vinda na documentação
    //model: "FINE_TUNED_MODEL", // modelo fino
    //model: "código-cushman-001", // nn pegou
    //model: "content-filter-alpha", // resultado loko
    //model: "text-curie-001", // Muito capaz, mas mais rápido e com custo menor que Davinci.
    //model: "texto-babbage-001" ,  // barata e direta
    //prompt: generatePrompt(req.body.animal),
    max_tokens:5,
    top_p: 1.0,
    //frequency_penalty: 0.0,
    //presence_penalty: 0.0,
    //stop: ["\n"],
    prompt: q,
    temperature: 0.9, // até 1, quanto maior mais diverso, quanto menor mais preciso
  });
  
  let call;
  //call = response.data.data[0].url;
  call = response;
  var status = response.status;
  var texto  = response.data.choices[0].text;
  //console.log(call);
  console.log("---------------------");
  console.log(call.data);
  console.log("Status: "+status);
  console.log("Texto: "+texto);
  */
  /////////  X BASE
  

  ////////////// CHATBOT SUPERCHAT
  async function start(){
        var id_user = 36; 
        var id_cliente = 36; 
        let client = await superchats.create({
            session: "AI",
            license: "9a7b0278abb4c2d2055cff68ce85b99cc46752fffee35cab5af4912c49490f8d",
            nodata: true,
            welcomeScreen: true, // Show or hide welcome in terminal
            retries: 3, // Number of connection attempts,
            nodata: true, // It doesn't get the entire history of the device (default = true) 
            logQr: true, // (Default is true) Logs QR automatically in terminal
            qrcode: (base64QR, asciiQR, urlCode) => {
                
            //console.log("base64 image of qrcode: ", base64QR);
            //console.log("Terminal image of qrcode in caracter ascii: ", asciiQR);
            //console.log("Terminal string hash of qrcode: ", urlCode);
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
                ////////////////// COMANDOS ADM
            },
            onPresence: (event) => {
                console.log(event)
            },
            onMessage: async (message) => {
                //return false;
                console.log(message);
                var id_produto = 8888;
                var id_msg_whats = message.id;
                //var id_cliente = 0;

                console.log(message.device);
                ///////////////////////////////////// testes
                

                //const callback = await get(url);
                //console.log(callback);
                /*
                

                // Aqui estão os dados que você deseja enviar.
                var data = {
                    'whats': 'valor1',
                    'nivel': 'valor2'
                };

                // Aqui está o código para enviar o POST.
                requests.post({url: url, form: data}, function(err, httpResponse, body) {  
                if (err) {
                    return console.error('Falha ao enviar o POST:', err);
                }
                console.log('POST enviado com sucesso!  Server respondeu com:', body);
                });
                */
                /////////////////////////////////////// x testes
                /*
                $.post("https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/10/" , {'post' : 'tste'}  , function(data){                                          

                })
                */
                
                // ################################ START ###################################################
                if(message.type == "text"){
                    var msg = message.content;
                    //if (msg.includes("A.i") || msg.includes("ai") || msg.includes("Ai") || msg.includes("A.I")) {
                    if (msg.includes("A.I")) {
                        await client.sendText(message.from,"🤖" , message.id);
                        //.then((result) => {
                        //var txt_ai = ["A.i,ai,Ai,A.I"];
                        var pergunta = msg.replace("A.I","");
                        console.log("A.I conectada...");
                        console.log("Pergunta... "+pergunta);

                        // ############################################################################## A.I
                        const openai = new OpenAIApi(configuration);
                        var q = pergunta;
                        var response = await openai.createCompletion({
                            model: "text-davinci-003", // vinda na documentação
                            //model: "FINE_TUNED_MODEL", // modelo fino
                            //model: "código-cushman-001", // nn pegou
                            //model: "content-filter-alpha", // resultado loko
                            //model: "text-curie-001", // Muito capaz, mas mais rápido e com custo menor que Davinci.
                            //model: "texto-babbage-001" ,  // barata e direta
                            //prompt: generatePrompt(req.body.animal),
                            max_tokens:100,
                            top_p: 1.0,
                            //frequency_penalty: 0.0,
                            //presence_penalty: 0.0,
                            //stop: ["\n"],
                            prompt: q,
                            temperature: 0.6, // até 1, quanto maior mais diverso, quanto menor mais preciso
                            });
                            console.log("Response openai:");
                            console.log(response);
                            
                            let call;
                            //call = response.data.data[0].url;
                            console.log("status: "+response.status);
                            call = response;
                            var status = response.status;
                            var texto  = response.data.choices[0].text;
                            client.sendText(message.from,texto,message.id)
                            .then((result) => {
                                console.log("A.I respondeu com sucesso!");
                            })
                            
                            
                        // ############################################################################## X A.I


                       // })
                    }
                }


                

                





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


 