// JQUERY
//import  'request';
//import * as https from 'https';
//import * as request from './node_modules/request/request.js';

import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
//import * as $ from 'Jquery';
//import * as fs from 'fs';
//import * as requests from 'requests';
//import { Request, get } from "request";
//const { Request, get } = require('request');

dotenv.config();
import request from "request";
//var request = require('requests');

//import {get , post}  from 'requests';

//const superchats = require("superchats");

//const express = require('express');
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
const {req} = request;

//var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/558183276882/10/";
//request.get(url_endpoint);

// Configure o seu servidor aqui.
//var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/10/";
//var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/558183276882/10/";
//var get_url = request.get(url_endpoint);
/*
Promise.resolve(get_url).then(function(value) {
    console.log(value); // "Success"
  }, function(value) {
    // not called
  });
  */
//console.log(get_url);
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
                if(event.content === "A.I"){
                    var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+evento.to+"/1/";
                    request.get(url_endpoint , function(callget){
                        console.log(callget);
                    })
                    //////////////////////////////////////// ENVIA LISTA COM SUGESTÕES
                    //const obj = JSON.parse(resposta);
                    var oo = [{title : "A Equipe"}];
                    var arr_rows = [];
                    // $##############  LISTA
                    var nome = "";
                    var descricao = "";
                    for(var h=0; h<7; h++){
                        console.log(h);
                        //console.log("ARRAY json: "+obj.length)
                        if(h == 0){
                            nome = "O Sábio";
                            descricao = "🤓 Faça uma perguntas inteligentes e receba respostas inteligentes";
                        }
                        if(h == 1){
                            nome = "Amigo";
                            descricao = "👨🏼 Faça uma pergunta a seu amigo e tenha a resposta dele";
                        }
                        if(h == 2){
                            nome = "Marvel";
                            descricao = "🦹🏻‍♂️ Faça uma pergunta ao sarcástico Marvel";
                        }
                        if(h == 3){
                            nome = "Professora Anne";
                            descricao = "👩🏼‍🏫 Faça tarefas e trabalhos com a ajuda da professora Anne";
                        }
                        if(h == 4){
                            nome = "Médico";
                            descricao = "🩺 Faça uma perguntas inteligentes e receba respostas inteligentes";
                        }
                        if(h == 5){
                            nome = "Fitness";
                            descricao = "- Faça uma perguntas inteligentes e receba respostas inteligentes";
                        }
                        if(h == 6){
                            nome = "Sexologa";
                            descricao = "- +18 Faça uma perguntas inteligentes e receba respostas inteligentes";
                        }
                        
                       // if(h <= obj.length){
                        arr_rows[h] = {title:  nome, description: descricao,  rowId: h}
                       // }
                        
                    }
                    oo[0]['rows'] = arr_rows;
                    console.log(oo);
                    
                    let response2 = client.sendList(
                        event.to,
                        "Escolha quem vai te responder",
                        oo,
                        "Escolha quem de nossa equipe pode te ajudar hoje",
                        "Você irá escrever uma pergunta para que nossa A.I possa te responder de acordo com o personagem escolhido. Mas cuidado com o que vai perguntar para não perder a oportunidade de ter repostas inteligentes.",
                        "Clique abaixo para visualizar as nossas opções",
                        
                    );
                    ////////////////////////////////////////
                    return false;
                }
                


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

                console.log(message.device);
                console.log("OK 2"); 
                ///////////////////////////////////// testes
                //var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/558183276882/10/";
                /*
                await request.get(url_endpoint , function(callget){
                    console.log(callget);
                })
                */
               // ################################ START ###################################################
                if(message.isgroup == false){
                    var isgroup = 0;
                    var from = message.from
                    var id_group = 0;
                }else{
                    var isgroup = 1;
                    var from = message.participant;
                    var id_group = message.from;
                    if(from == ''){
                        from = message.from;
                    }
                }
                //jquery.post("https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from , {'nome' : message.pushName ,'contato' : message.from , 'msg' : message.content , 'id_user' : id_user, 'id_produto' : id_produto , 'id_whats' : id_msg_whats , 'isgroup' : isgroup , 'id_group' : id_group  } , function(data_call){
                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'whats' : '454654564',
                        'nome' : message.pushName ,
                        'contato' : message.from , 
                        'msg' : message.content , 
                        'id_user' : id_user, 
                        'id_produto' : id_produto , 
                        'id_whats' : id_msg_whats , 
                        'isgroup' : isgroup , 
                        'id_group' : id_group
                    }
                }, function(err, httpResponse, body) {
                    return new Promise(function(resolve, reject) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                            console.log("NIVEL USUSARIO:");
                            console.log(body);
                            var nivel_user = parseInt(body);
                            console.log("ESSE É O NIVEL DO USUARIO::: "+nivel_user);
                            console.log(message.type);
                        } // x else if err promiss pos get_dd_wzap
                    }); // x function get_dd_wzap
                }); // x request post get_dd_wzap
                
      
                
                if(message.type == "text"){
                    var msg = message.content;

                    // RESET  e chama a lista inicial
                    if(msg === "A.I"){
                        var url_endpoint = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/1/";
                        request.get(url_endpoint , function(callget){
                            console.log(callget);
                        })
                        //////////////////////////////////////// ENVIA LISTA COM SUGESTÕES
                        //const obj = JSON.parse(resposta);
                        var oo = [{title : "A Equipe"}];
                        var arr_rows = [];
                        // $##############  LISTA
                        var nome = "";
                        var descricao = "";
                        for(var h=0; h<7; h++){
                            console.log(h);
                            //console.log("ARRAY json: "+obj.length)
                            if(h == 0){
                                nome = "O Sábio";
                                descricao = "🤓 Faça uma perguntas inteligentes e receba respostas inteligentes";
                            }
                            if(h == 1){
                                nome = "Amigo";
                                descricao = "👨🏼 Faça uma pergunta a seu amigo e tenha a resposta dele";
                            }
                            if(h == 2){
                                nome = "Marvel";
                                descricao = "🦹🏻‍♂️ Faça uma pergunta ao sarcástico Marvel";
                            }
                            if(h == 3){
                                nome = "Professora Anne";
                                descricao = "👩🏼‍🏫 Faça tarefas e trabalhos com a ajuda da professora Anne";
                            }
                            if(h == 4){
                                nome = "Médico";
                                descricao = "🩺 Faça uma perguntas inteligentes e receba respostas inteligentes";
                            }
                            if(h == 5){
                                nome = "Fitness";
                                descricao = "- Faça uma perguntas inteligentes e receba respostas inteligentes";
                            }
                            if(h == 6){
                                nome = "Sexologa";
                                descricao = "- +18 Faça uma perguntas inteligentes e receba respostas inteligentes";
                            }
                            
                           // if(h <= obj.length){
                            arr_rows[h] = {title:  nome, description: descricao,  rowId: h}
                           // }
                            
                        }
                        oo[0]['rows'] = arr_rows;
                        console.log(oo);
                        
                        let response2 = client.sendList(
                            message.from,
                            "Escolha quem vai te responder",
                            oo,
                            "Escolha quem de nossa equipe pode te ajudar hoje",
                            "Você irá escrever uma pergunta para que nossa A.I possa te responder de acordo com o personagem escolhido. Mas cuidado com o que vai perguntar para não perder a oportunidade de ter repostas inteligentes.",
                            "Clique abaixo para visualizar as nossas opções",
                            message.id
                        );
                        ////////////////////////////////////////
                        return false;
                    }

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



                    // #########################################

                    var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/get_nivel_user/"+message.from+"/"+id_user+"/"; 
                    /*
                    var get_nivel = request.get(url_endpointGET , call_get)
                    .then((call_get) => {
                        console.log(result);
                    })
                    console.log("NIVEL VIA GET"+get_nivel);
                    return false;
                    */
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO para comparar com o personagem escolhido:");
                                    var nivel_user_now = body;
                                    console.log(nivel_user_now);

                                    var from = message.from;
                                    // ############## IFs de condicoes para perguntar a equipe
                                    // MARVEL
                                    if(message.type == "text" && nivel_user_now == 11){
                                        var id_produto_int = 757;
                                        console.log("O IF DE MARVEL PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003",
                                            prompt: "Marv is a chatbot that reluctantly answers questions with sarcastic responses:You: "+q+"?\nMarv:",
                                            temperature: 0.0,
                                            max_tokens: 60,
                                            top_p: 0.3,
                                            frequency_penalty: 0.5,
                                            presence_penalty: 0.0,
                                            //model: "text-davinci-003", // vinda na documentação
                                            //max_tokens:100,
                                            //top_p: 1.0,
                                            //prompt: q,
                                            //temperature: 0.6, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"🦹🏻‍♂️ "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    } //   X MARVEL
                                    // O SÁBIO
                                    if(message.type == "text" && nivel_user_now == 21){
                                        var id_produto_int = 760;
                                        console.log("O IF DO SABIO PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003", // vinda na documentação
                                            max_tokens:100,
                                            top_p: 1.0,
                                            //prompt: q,
                                            prompt: "Eu sou o Sábio. Além de ser sábio eu gosto de compartilhar minha inteligência usando meu conhecimento para ensinar:\n\nYou: "+q+"?\nSábio:",
                                            temperature: 1, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"🤓 "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    }
                                    // AMIGO
                                    if(message.type == "text" && nivel_user_now == 31){
                                        var id_produto_int = 761;
                                        console.log("O IF DO AMIGO PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003", // vinda na documentação
                                            max_tokens:100,
                                            top_p: 1.0,
                                            prompt: "Amigo é um amigo fiel e honesto que gosta muito de conversar:You: "+q+"?\nAmigo:",
                                            temperature: 0.6, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"👨🏼 "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })
                                        

                                    }
                                    // PROFESSORA ANNE
                                    if(message.type == "text" && nivel_user_now == 41){
                                        var id_produto_int = 758;
                                        console.log("O IF DA PROFESSORA PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003", // vinda na documentação
                                            max_tokens:200,
                                            top_p: 1.0,
                                            prompt: "Eu sou uma Professora que estou sempre ajudando e incentivando meus alunos a aprender. Tambem ajudo com trabalhos e tarefas escolares :You: "+q+"?\Professora:",
                                            temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"👩🏼‍🏫 "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    }

                                    // MEDICO
                                    if(message.type == "text" && nivel_user_now == 51){
                                        var id_produto_int = 762;
                                        console.log("O IF DA medico PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003", // vinda na documentação
                                            max_tokens:200,
                                            top_p: 1.0,
                                            prompt: "Eu sou o médico te ajudo conhecimentos sobre medicina e tratamentos naturais:You: "+q+"?\Médico:",
                                            temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from," 🩺 "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    }

                                    // FITNESS
                                    if(message.type == "text" && nivel_user_now == 61){
                                        var id_produto_int = 759;
                                        console.log("O IF DA FITNIESS PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003",
                                            prompt: "Brainstorm some ideas combining VR and fitness:You:"+q+"",
                                            temperature: 0.6,
                                            max_tokens: 150,
                                            top_p: 1.0,
                                            frequency_penalty: 1,
                                            presence_penalty: 1,

                                            //model: "text-davinci-003", // vinda na documentação
                                            //max_tokens:200,
                                            //top_p: 1.0,
                                            //prompt: "Eu sou O CARA DO FITNIESS Professora que estou sempre ajudando e incentivando meus alunos a aprender. Tambem ajudo com trabalhos e tarefas escolares :You: "+q+"?\Professora:",
                                            //temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"🏋️ "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    }

                                    // SEXOLOGA
                                    if(message.type == "text" && nivel_user_now == 71){
                                        var id_produto_int = 763;
                                        console.log("O IF DA PROSEXOLOGA  PEGOU");
                                        // ############################################################################## A.I                                        
                                        const openai2 = new OpenAIApi(configuration);
                                        var q = message.content;
                                        console.log("PARA O PROMPT:  "+q);
                                        var response =  openai2.createCompletion({
                                            model: "text-davinci-003", // vinda na documentação
                                            max_tokens:200,
                                            top_p: 1.0,
                                            prompt: "Eu sou uma sexologa Estou aqui pra te ajudar com dicas quentes e inteligentes sobre sexo. Gosto muito dar dicar para melhorar o seu rendimento sexual:You: "+q+"?\sexologa:",
                                            temperature: 0.7, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                        })
                                        .then((result2) => {
                                            console.log(result2);    
                                            console.log("status: "+result2.status);
                                            console.log("result2 openai:");                                            
                                            let call;                                            
                                            console.log("status: "+result2.status);
                                            call = result2;
                                            
                                            var status = result2.status;
                                            var texto  = result2.data.choices[0].text;
                                            console.log("Texto: "+texto);
                                            client.sendText(message.from,"👩🏼‍🏫 "+texto,message.id)
                                            .then((result) => {

                                                ////////////////////////// DB
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/set_resp_ai/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {                                                        
                                                        'id_personagem' : id_produto_int,
                                                        'nome' : message.pushName ,
                                                        'whats' : message.from , 
                                                        'pergunta' : message.content , 
                                                        'resposta' : texto,
                                                        'id_user' : id_user, 
                                                        'id_produto' : id_produto_int, 
                                                        'id_whats' : message.id
                                                    }
                                                }, function(err, httpResponse, body_cad) {
                                                    return new Promise(function(resolve, reject) {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(body_cad);
                                                            console.log(body_cad);
                                                        } // x else if err promiss pos get_dd_wzap
                                                    }); // x function get_dd_wzap
                                                }); // x request post get_dd_wzap
                                                ////////////////////////// x DB


                                                console.log("A.I Marvel respondeu com sucesso!");
                                            })
                                        })

                                    } 
                                    
                                    

                                    // ##############  x IFs







                                }
                            });
                        });
                         
                    


                    // X #######################################



                } // x if text

                /*
                nome = "Amigo";                    
                nome = "Marvel";                    
                nome = "Professora Anne";                    
                nome = "O Sábio";
                */
                if(message.type === 'list-response'){
                    if( (message.type === 'list-response' && message.title == "Marvel") || (message.type === 'text' && message.content == "Marvel") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/11/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });                        
                        await client.sendText(message.from,"🦹🏻‍♂️ Eu sou Márvel! Comigo não tem frescura. Falo mesmo e pronto!");
                    }

                    if( (message.type === 'list-response' && message.title == "Amigo") || (message.type === 'text' && message.content == "Amigo") ){
                        await client.sendText(message.from,"👨🏼 Olá eu sou seu amigo! Quando quiser conversar, me pergunta algo que vem na sua cabeça que começamos um papo.");
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/31/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                    }

                    if( (message.type === 'list-response' && message.title == "Professora Anne") || (message.type === 'text' && message.content == "Anne") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/41/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                        await client.sendText(message.from,"👩🏼‍🏫 Eu sou a professora Anne! Vou te ajudar com seus trabalhos e tarefas escolares.");
                    }

                    if( (message.type === 'list-response' && message.title == "O Sábio") || (message.type === 'text' && message.content == "O Sábio") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/21/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                        await client.sendText(message.from,"🤓 Eu sou o Sábio! Qualquer pergunta eu respondo! Só não consigo prever o futuro kkkk");
                    }

                    if( (message.type === 'list-response' && message.title == "Médico") || (message.type === 'text' && message.content == "Médico") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/51/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                        await client.sendText(message.from,"🩺 Eu sou o Médico! Caso tenha alguma dor ou sentindo algo estranho, escreve pra mim que posso tentar te ajudar");

                    }

                    if( (message.type === 'list-response' && message.title == "Fitness") || (message.type === 'text' && message.content == "Fitness") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/61/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                        await client.sendText(message.from,"Eu sou o CARA do Fitness! Com muitas dicas e exercícios pra você");

                    }

                    if( (message.type === 'list-response' && message.title == "Sexologa") || (message.type === 'text' && message.content == "Sexologa") ){
                        var url_endpointGET = "https://chatbot-whatsapp-br.com.br/whats/set_nivel_user/"+message.from+"/71/"; 
                        request.get({
                            url: url_endpointGET                        
                        }, function(err, httpResponse, body) {
                            return new Promise(function(resolve, reject) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                    console.log("NOVO NIVEL USUSARIO:");
                                    console.log(body);
                                }
                            });
                        });
                        await client.sendText(message.from,"- Eu sou a Sexologa! Sempre com dicas quentes pra você. É só perguntar! ");

                    }
                } // x if list-response


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


 