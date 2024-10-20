
// Função para Javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');

import request from "request";

const superchats = require("superchats");

import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
    apiKey: process.env.OPENAI_API_KEY,
});

async function start(){
let client = await superchats.create({
  session: "AI-Delivery-v2",
  license: "QKQ0ZDOOGO-XLQQJKW82M-LJSAHROR3Q-MQ4M107WUN",
  driveStorage: "local",
//   qr?: false, // Breve
//   code?: true, // Breve
//   phoneNumber?: '5561985290357', // Breve
//   nodata?: true,
//   logQr?: false,
//   alwaysOn?: true, 
//   autoRead?: true, 
//   nodata?: true, 
//   logQr?: true,
  statusFind: async (status) => {
    console.log(status)
  },
//   pairing?: async (session, code) => {
//   console.log(`code: ${code}`);
//   },
  qrcode: async (session, base64Img, asciiQR, urlCode) => {
  console.log(asciiQR)
  },
  onAnyMessage: async (message) => {
    console.log(message);

    if (message.content && message.content.conversation) {
        var msg = message.content.conversation;
    } else {
        console.log('Mensagem inválida:', message);
        var msg = "Mensagem inválida";
        return; // Se a mensagem não tiver conteúdo válido, você pode parar a execução aqui.
    }
    
     if ((message.type == "text" || message.subtype == 'text')  && message.content.conversation == "hi") {
       await client.sendText(message.from, "Let's GO Superchats");

     }
     

     //var msg = message.content.conversation;

     const openai = new OpenAIApi(configuration);

     // IMAGEM
    //  if(msg.includes("imagem")){
    //     console.log("CRIA IMAGEM");

    //     const options = {
    //         prompt: msg, // Descrição da imagem
    //         n: 1, // Número de imagens a serem geradas
    //         size: "1024x1024", // Tamanho da imagem
    //     }

    //     var response = openai.createImage(options)
    //     .then((result) => {
    //         //console.log('Result: ', result); //return object success
    //         console.log(result.data.data[0].url);
    //         client
    //         .sendImage(message.from, result.data.data[0].url)
    //         .then((result) => {
    //             console.log('Result: ', result); //return object success
    //         })
    //     })
    //     . catch (function(err){
    //         console.log('errrro: ', err); //return object success
    //     }) 

        
    //     console.log( "ENVOU A IMAGEM -- RETURN FALSE");

    //     return false;
    // } // x if imagem
    

     if (message.type == "textMessage" || message.subtype == 'textMessage' || message.subtype == 'text') {

        console.log("mensagem enviada:" );
        console.log(msg); // 'Ff'


        // ############################################# 
        console.log("OK 1"); 
        console.log(message);
        var id_user = 31;
        var id_produto = 5555;
        var id_cliente = 31;
        var id_msg_whats = message.id;
       // var msg = message.content.conversation;
        var pergunta = msg;
        //var pergunta = msg;
        //var id_cliente = 0;

        ///console.log(message.device);
        
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
        //console.log(message);
        //jquery.post("https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from , {'nome' : message.pushName ,'contato' : message.from , 'msg' : message.content , 'id_user' : id_user, 'id_produto' : id_produto , 'id_whats' : id_msg_whats , 'isgroup' : isgroup , 'id_group' : id_group  } , function(data_call){
        //var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
        var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap_ai/"+from; 
        request.post({
            url: url_endpointpost,
            form: {
                key: 'value',
                'roles_ai': "user",
                'whats' : message.participant,
                'nome' : message.pushName ,
                'contato' : message.from , 
                'to' : message.to , 
                'msg' : msg , 
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

        // ##########-------------------------
        
         
        // #############################################


        // ########## CHATGPT ########
        

        function fazerConsulta(from,to=0) {
            return new Promise((resolve, reject) => {
                const url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_conversa_wzap/" + from;
            
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'roles_ai': "user",
                        'whats': from,
                        'to' : to,
                    }
                    }, (err, httpResponse, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(body);
                    }
                    });
                });
        }

        // PROMPTS
        // Funções para gerar prompts específicos
        
        
        function gerarPromptRestaurantes() {
            return [
            "Você é um assistente para ajudar a organizar pedidos em um restaurante.",
            "Gerencie o cardápio, processe pedidos e ajude a calcular valores e tempo estimado de entrega."
            ].join(" ");
        }
                
        // X PROMPTS

        

          // Em algum lugar do seu código, você pode usar a função fazerConsulta:
          //var to = message.participant;
          var to = message.from;
        fazerConsulta(from,to)
        .then(body => {
            console.log(body); // Aqui você pode acessar a resposta da consulta
            var historico = JSON.parse(body);
            console.log("Conversa acumulada JSON");
            console.log(historico);
            //return false;

            var q = pergunta;
            

            var prompt_base = gerarPromptRestaurantes();

            

            // DELIVERY

            var url_endpointpost = "https://chatbot-whatsapp-br.com.br/app/get_cardapio_ai/0/"+id_cliente; 
            request.post({
                url: url_endpointpost,
                form: {
                    key: 'value',
                    'q' : q,                                        
                }
            }, function(err, httpResponse, data_list) {
                return new Promise(function(resolve, reject) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data_list);
                        console.log("data_list cardapio:");
                        console.log(data_list);

                        //return false;

                        var tit = "--";
    
                        tit = message.selectDisplay;
                        //const obj = JSON.parse(data_list);
                        const obj = JSON.parse(data_list || '[]'); // Garante que o JSON seja um array vazio em caso de erro.
                        if (obj.length === 0) {
                            console.log('Cardápio não encontrado ou vazio');
                            return false;
                        }

                        console.log("obj::::::");
                        console.log(obj);
                        //return false;
                        if(obj != "0" && obj != 0){

                            var oo = [{title : "Cardápio "}];
                            var arr_rows = [];
                            var cardapio_inicial = " Cardápio: ";
                            // $##############  LISTA
                            for(var h=0; h<obj.length; h++){
                                console.log(obj);
                                console.log("ARRAY json: "+obj.length)
                                if(h <= obj.length){
                                    //arr_rows[h] = {title:  obj[h].nome, description: obj[h].descricao  ,rowId: obj[h].id}
                                    arr_rows[h] = {title:  obj[h].modelo, description: "💵 R$ "+obj[h].preco_venda+" \n🗒️ "+obj[h].especificacoes,  rowId: h}
                                    //cardapio_inicial += obj[h].modelo+", valor: "+obj[h].preco_venda+", descrição: "+obj[h].especificacoes;
                                    cardapio_inicial += obj[h].modelo+", valor: R$ "+obj[h].preco_venda+"("+obj[h].preco_venda+")";
                                }
                                
                            }
                        } // x if !+ 0
                        else{
                            var cardapio_inicial = "Seja gentil, educada e descontraída para poder realizar um bom atendimento e concluir o pedido";
                        }
                        //oo[0]['Pratos'] = arr_rows;
                        //console.log(data_list);
                        console.log("Parou aqui 1");

                        

                        //var map = map((prato, index) => `${index + 1}. ${prato.modelo}: ${prato.especificacoes}`).join('\n');
                        // const cardapioFormatado = `**Cardápio:**\n` +
                        // data_list.map((prato, index) => `${index + 1}. ${prato.modelo}: ${prato.especificacoes}`).join('\n');

                        //const prompt_base = `${cardapioFormatado}\nAqui está o cardápio. O que você gostaria de pedir?`;
                        const prompt_base = "Você está falando como nosso atendente de delivery. Aqui está um link para o nosso cardápio completo: [Cardápio Completo](https://chatbot-whatsapp-br.com.br/app/cardapio/"+id_cliente+"). Pode digitar o nome do prato que calculamos pra você. Sempre responda informando os produtos (que foram inseridos no prompt roles system)  Como posso ajudar você hoje?.";
                        console.log(cardapio_inicial);
                

                        //return false;
                        // X DELIVERY

                        //console.log(messages);

                        console.log("Parou aqui 2");

                        if(obj != "0" && obj != 0){              

                            var messages = [
                                {
                                    "role": "system",
                                    "content": cardapio_inicial
                                },
                                {
                                    "role": "assistant",
                                    "content": "Depois que o cliente confirmar e finalizar o pedido, envie o  pagamento PIX (81983276882) Nu Bank para que ele realize o pagamento."
                                },
                                {
                                    "role": "system",
                                    "content": "Adicione 5 reais da taxa de entrega no total do pedido."
                                },
                                {
                                    "role": "system",
                                    "content": "Sempre solicite o endereço de entrega após confirmar o pedido."
                                },
                                {
                                    "role": "assistant",
                                    "content": prompt_base
                                },
                            ];
                        }else{

                            var messages = [
                                {
                                    "role": "system",
                                    "content": prompt_base
                                },                                                    
                            ];

                        }

                        console.log("Parou aqui 3");
                        


                        ///////////////////////////  CODIGO A.I PELO chatgpt
                        
                        console.log(historico);
                        console.log(messages);
                        //return false;
                        if(historico != "0" && historico != 0){

                            historico.forEach(conversa => {
                                // console.log(conversa.role);
                                // console.log(conversa.content);
                                // console.log("---------------");
                                messages.push({
                                "role": conversa.role,
                                "content": conversa.content
                                });
                                // messages.push({
                                //   "role": "assistant",
                                //   "content": conversa.assistantMessage
                                // });
                            });
                        }
                        
                        // Adicione a nova mensagem do usuário ao final do histórico.
                        messages.push({
                            "role": "user",
                            "content": '"""'+q+'"""'
                        });
                        /////////////////////////// XX CODIGO A.I PELO chatgpt


                
                        
                        console.log("ROLES::::");
                        //return false;

                        
                    
                        
                        console.log(messages);
                        //console.log(functions);
                        // messages
                        //return false;

                        
                        
                        // ESTUDO
                        // https://www.youtube.com/watch?v=_r1ipz7k6p8&list=PLYio3GBcDKsPP2_zuxEp8eCulgFjI5a3g&index=7
                        // https://www.youtube.com/watch?v=fe5dSQbSVV4

                        var call_response =  openai.createChatCompletion({
                            //model: "text-davinci-003", // vinda na documentação
                            model: "gpt-3.5-turbo", // vinda na documentação                            
                            max_tokens:100,
                            //top_p: 1.0,                            
                            //prompt: prompt_base + ": " + conversa.join(' '),
                            messages,
                            //functions: functions_clima,
                            
                            /*
                            messages: [

                                {
                                    "role" : "system",
                                    "content" : prompt_base
                                },
                            */                                        
                                //temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                                temperature: 0.9, // até 1, quanto maior mais diverso, quanto menor mais preciso
                        })
                        .then(function(response){
                            console.log(response);
                            
                            

                            let call;
                            //call = response.data.data[0].url;
                            //console.log("status: "+response);
                            console.log("CHOICE: "+response.data.choices[0]);
                            call = response;
                            console.log(call.data);
                            var status = response.status;
                            var texto_arr = response.data.choices[0].message;
                            var texto  = response.data.choices[0].message.content;
                            console.log(texto_arr);
                            console.log(texto);

                            

                            // SETA NO BANCO
                            var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap_ai/"+from; 
                            request.post({
                                url: url_endpointpost,
                                form: {
                                    key: 'value',
                                    'roles_ai' : "assistant",
                                    'whats' : to,
                                    'nome' : "BOT" ,
                                    'contato' : from , 
                                    'msg' : texto , 
                                    'id_user' : 8, 
                                    'id_produto' : 8 , 
                                    'id_whats' : "888" , 
                                    'isgroup' : 0 , 
                                    'id_group' : 0
                                }
                            }, function(err, httpResponse, body) {
                                return new Promise(function(resolve, reject) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(body);
                                        console.log(body);                                    
                                        console.log("dados do BOT salvo");                                    
                                    } // x else if err promiss pos get_dd_wzap
                                }); // x function get_dd_wzap
                            }); // x request post get_dd_wzap


                            // X SETA NO BANCO 

                            // console.log( "CHEGOU A AQUI 12-- RETURN FALSE");
                            // return false;

                            if (typeof msg === 'string' && msg.trim() !== '') {
                                //client.sendText(message.from, message.content.conversation);
                                client.sendText(message.from,texto,message.id)
                                .then((result) => {
                                    console.log("A.I respondeu com sucesso!");
                                })
                            } else {
                                console.log('Conteúdo da mensagem é inválido ou vazio');
                            }


                            // client.sendText(message.from,texto,message.id)
                            // .then((result) => {
                            //     console.log("A.I respondeu com sucesso!");
                            // })
                        })
                        
                            
                        // ############################################################################## X A.I

                    } // x else if err promiss pos get_dd_wzap
                }); // x function get_dd_wzap
            }); // x request post get_dd_wzap


            return false;
           
            
                
            // ############################################################################## X A.I



        }) // xxxxxxxxxxxxxxxxxxxxx then xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        .catch(err => {
            console.error(err); // Trate qualquer erro que possa ocorrer na consulta
        });
        // ######## X CHATGPT ########




     } // x if text ########################################
   }  // Receive an event all the time you receive a message from some contact
})

return client;

}



(async function(){
  let client = await start();
  let response = await client.sendText('5581983276882', 'Obrigado por usar SuperChats!!!');
  console.log(response);
})()