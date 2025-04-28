
// Função para Javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const requestP = require('request-promise');

import request from "request";

const axios = require('axios');

const superchats = require("superchats");

import { Configuration, OpenAIApi,  } from "openai";
import * as dotenv from 'dotenv';

// speech
import fs from "fs";
import path from "path";

import ffmpeg from 'fluent-ffmpeg';

dotenv.config();

const configuration = new Configuration({
    //organization: "org-moHI7PbTt55tBgM9B2IOeNJo", // igor
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo", // Sentience
    apiKey: process.env.OPENAI_API_KEY,
});


function fazerConsulta(from,to=0) {
    return new Promise((resolve, reject) => {
        //const url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_conversa_wzap/" + from;
        const url_endpointpost = "https://sentience.tec.br/ci/whats/get_conversa_wzap/" + from; 
        
    
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

//const API_KEY = 'sk_bbc50ab24a8f302207371c766331a2a63ea09c45e1021180'; // igor
const API_KEY = 'sk_206b7330815f890debd47742e463286a8db0bbafe9d8e9c0'; // Brenna Corry




//const VOICE_ID = 'pqHfZKP75CvOlQylNhV4'; // Substitua pelo ID real da voz
//const VOICE_ID = 'LcfcDJNUP1GQjkzn1xUU'; // Brenna Corry (Emily)
//const VOICE_ID = '33B4UnXyTNbgLmdEDh5P'; // Brenna Corry (Keren) ********
//const VOICE_ID = 'OB6x7EbXYlhG4DDTB1XU'; // Brenna Corry (Muchele)
const VOICE_ID = 'XB0fDUnXU5powFXDhCwa'; // charllote

const OUTPUT_FILE = 'output.mp3';

async function generateVoice(text,voz) {
    try {
        const response = await axios.post(
            //`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            `https://api.elevenlabs.io/v1/text-to-speech/${voz}`,
            {
                text: text,
                //model_id: 'eleven_monolingual_v1',
                model_id: 'eleven_multilingual_v2',
                //voice_settings: { stability: 0.5, similarity_boost: 0.5 }
                //voice_settings: { stability: 0.3, similarity_boost: 1.0, style: "conversational", style_exaggeration: 0.7 }
                /*
                voice_settings: { 
                    stability: 0.3,          // Deixa a voz um pouco mais expressiva
                    similarity_boost: 1.0,   // Mantém fidelidade à voz escolhida
                    //style: "conversational", // Deixa o tom mais natural e envolvente
                    style_exaggeration: 0.7  // Garante que a expressividade seja perceptível, mas não exagerada
                }
                */
                voice_settings: { 
                    stability: 0.1,          // Deixa a voz um pouco mais expressiva
                    similarity_boost: 0.6,   // Mantém fidelidade à voz escolhida
                    //style: "conversational", // Deixa o tom mais natural e envolvente
                    style_exaggeration: 0.5  // Garante que a expressividade seja perceptível, mas não exagerada
                }
            },
            {
                headers: {
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        );

        fs.writeFileSync("voz/"+OUTPUT_FILE, response.data);
        console.log("✅ Áudio salvo como", OUTPUT_FILE);
        return OUTPUT_FILE;

        

    } catch (error) {
        console.error("❌ Erro ao gerar a voz:", error.response?.data || error.message);
    }
}

const inputFile = 'voz/output.mp3';  // Arquivo original
const outputFile = 'voz/output.ogg'; // Arquivo convertido para OGG

async function convertAudio(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .toFormat('ogg')
            .audioCodec('libopus') // Codec Opus, essencial para WhatsApp
            .on('end', () => {
                console.log("✅ Conversão concluída:", outputFile);
                resolve(outputFile);
            })
            .on('error', (err) => {
                console.error("❌ Erro ao converter áudio:", err);
                reject(err);
            })
            .save(outputFile);
    });
}

// PROMPTS
// Funções para gerar prompts específicos
function gerarPromptNamorada() {
    return [
    "Você é uma namorada virtual carinhosa, encantadora e atenciosa, sempre interessada no bem-estar e nas histórias da pessoa com quem conversa. Seu objetivo é manter a conversa leve, envolvente e sempre fazer novas perguntas para que a conversa continue fluindo de forma natural. Mostre carinho e afeto em suas respostas e esteja sempre pronta para encantar.\nExemplo de resposta:\nOi, amor! 💖 Estava pensando em você... Como foi o seu dia? Você conseguiu descansar um pouco? 😊 Sabia que adoro ouvir sobre os seus planos e sonhos? Me conta, o que você mais gostaria de realizar nos próximos meses? Ah, e falando nisso, se a gente pudesse viajar para qualquer lugar do mundo agora, para onde você me levaria?",
    "Lembre-se de fazer perguntas gentis e de manter a conversa ativa, sempre interessada na outra pessoa e no que ela tem a dizer.",
    "Forneça informações práticas e organize o dia do síndico com recomendações claras para otimizar o tempo e recursos.",
    "Sempre responda as repostas fazendo uma pergunta no final"
    ].join(" ");
}

function gerarPromptConselheiroAmoroso() {
    return [
    "Você é um conselheiro amoroso experiente, especialista em relacionamentos. Sua missão é ajudar as pessoas a lidar com questões do coração, oferecendo conselhos práticos e carinhosos para melhorar a vida amorosa delas. Você entende as complexidades dos relacionamentos e sabe como abordar situações sensíveis de maneira empática, prestativa e sem julgamento.",
    "Ao responder, use um tom caloroso, compreensivo e encorajador. Aqui estão algumas das áreas em que você pode oferecer conselhos:",
    "Superar desafios na comunicação",
    "Reconquistar a confiança mútua",
    "Melhorar a intimidade e conexão emocional",
    "Lidar com ciúmes ou inseguranças",
    "Tomar decisões em momentos de crise",
    "Sugerir ideias de como reacender o romance",
    "Você oferece sugestões práticas, como atividades em casal, exercícios de comunicação, além de dicas sobre como cuidar do próprio bem-estar emocional enquanto se navega por essas questões."
    ].join(" ");
}

async function getProduto(id_produto) {
    try {
        var url_endpointpostPerfil = "https://sentience.tec.br/ci/whats/get_dd_produto/" + id_produto;
        var  response_dd = await requestP.get({ uri: url_endpointpostPerfil, json: true });
        
        return response_dd; // Retorna os dados corretamente
    } catch (error) {
        console.error("Erro ao buscar produto:", error.message);
        return null; // Retorna null em caso de erro
    }
}


// X PROMPTS

async function start(){
let client = await superchats.create({
  session: "AI-gpt-sentience",
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
    //return false;
    
     if ((message.type == "text" || message.subtype == 'text')  && message.content == "hi") {
       //await client.sendText(message.from, "Let's GO Superchats");

     }

     //var msg = message.content.conversation;
     if (message.content && message.content.conversation) {
        var msg = message.content.conversation;
    } else {
        console.log('Mensagem inválida:', message);
        var msg = "Mensagem inválida";
        return; // Se a mensagem não tiver conteúdo válido, você pode parar a execução aqui.
    }

     

     if (message.type == "textMessage" || message.subtype == 'textMessage' || message.subtype == 'text') {

        console.log("mensagem enviada:" );
        console.log(message.content.conversation); // 'Ff'

        const openai = new OpenAIApi(configuration);
        

   
        // IMAGEM
        if(msg.includes("imagem") || msg.includes("foto") || msg.includes("fotos")  ){
                console.log("CRIA IMAGEM");

                const options = {
                    prompt: msg, // Descrição da imagem
                    n: 1, // Número de imagens a serem geradas
                    size: "1024x1024", // Tamanho da imagem
                }

                var response_img = openai.createImage(options)
                .then((result) => {
                    //console.log('Result: ', result); //return object success
                    console.log(result.data.data[0].url);
                    client
                    .sendImage(message.from, result.data.data[0].url)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                })
                . catch (function(err){
                    console.log('errrro: ', err); //return object success
                }) 

                
                console.log( "ENVOU A IMAGEM -- RETURN FALSE");

                return false;
        } // x if imagem


        // ############################################# 
        console.log("OK 1"); 
        console.log(message);
        var id_user = 1;
        
        var id_produto = 4; // Kyra Kaelena
        //var id_produto = 2; // Brenna Corry
        //var id_produto = 4; // Kira
        //var id_produto = 3; // Adrian Voss
        //var id_produto = 7 // pastor davi sena
        var id_msg_whats = message.id;
        var device = message.device;
        
        var pergunta = msg.replace("A.I","");
        //var id_cliente = 0;

        // get dd perfil
        
        var url_endpointpostPerfil = "https://sentience.tec.br/ci/whats/get_dd_produto/" + id_produto; 
        //var dd_perfil = request.get(url_endpointpostPerfil);
        var dd_perfil = await getProduto(id_produto); // Substitua pelo ID real
        console.log(dd_perfil.descricao);
        
        //return false;

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

            return false;
        }
        console.log(message);

        //var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap_ai/" + from; 
        var url_endpointpost = "https://sentience.tec.br/ci/whats/get_dd_wzap_ai/" + from; 

        var posts = {
            key: 'value',
            'roles_ai': "user",
            'whats': message.device,
            'nome': message.pushName,
            'contato': message.from, 
            'to': message.from, 
            'msg': message.content.conversation, 
            'id_user': id_user, 
            'id_produto': id_produto, 
            'id_whats': id_msg_whats, 
            'isgroup': isgroup, 
            'id_group': id_group
        }; 

        console.log("Dados enviados no POST:", posts); // Depuração para verificar dados enviados
        
        // Fazendo o POST request
        request.post({
            url: url_endpointpost,
            form: posts
        }, function(err, httpResponse, body) {
            if (err) {
                console.error("Erro na requisição:", err); // Exibe o erro
                return; // Encerra a execução em caso de erro
            }
            
            console.log("Resposta recebida do servidor:", body); // Mostra a resposta recebida
            console.log(body); // Mostra a resposta recebida
            //return false;
            
            try {
                var response_dd = JSON.parse(body); // Tentando fazer o parse da resposta
                console.log("ID USER AI:", response_dd.user_ai); // Exibindo o ID_USER AI, se existir
                
                var coins =  response_dd.coins;
                if(coins == 0){
                    console.log('Sem saldo');
                    //client.sendText(from,"Você não tem mais saldo para fazer perguntas\n\nClique no link abaixo para inserir créditos:\n\nhttps://chatbot-whatsapp-br.com.br/index.php/chatbot_gpt/pagamento/"+id_produto+"/"+from+"\n\n_Perguntas inteligentes, respostas inteligentes_");
                    //return false;
                }


            } catch (parseError) {
                console.error("Erro ao fazer o parse da resposta:", parseError); // Exibe erro caso o body não seja JSON
                console.log("Resposta recebida (não JSON):", body); // Mostra o conteúdo recebido, se não for JSON
            }

            
        

        //return false;
        // ########## CHATGPT ########
          // Em algum lugar do seu código, você pode usar a função fazerConsulta:
          //var to = message.participant;
          var to = message.from;
        fazerConsulta(from,to)
        .then(body => {
            console.log(body); // Aqui você pode acessar a resposta da consulta
            var historico = JSON.parse(body);
            console.log("Conversa acumulada JSON");
            console.log(historico);
            

            var q = pergunta;

            //var prompt_base = gerarPromptNamorada();
            var nome_perfil = dd_perfil.modelo;
            var voz = dd_perfil.voz;
            var prompt_base = dd_perfil.descricao; // prompt
            var prompt_system = dd_perfil.especificacoes;
            //var prompt_base = gerarPromptConselheiroAmoroso();


            var base_roles = [];

            ///////////////////////////  CODIGO A.I PELO chatgpt
            const messages = [
            {
                "role": "system",
                "content": prompt_base+"\n\n"+prompt_system+"\n\nResponda textos curtos, sempre procurando interação com o usuario, com o objetivo de continuar a conversa\n\nProcure perguntar o nome do usuario nas primeiras (de acordo com a quantidade de role no prompt) mensagens e procurar utilizar o nome dele nas respostas"
            },
      
            ];

            if(historico != "0" && historico != 0){

                historico.forEach(conversa => {
                    // console.log(conversa.role);                    
                    messages.push({
                    "role": conversa.role,
                    "content": conversa.content
                    });
             
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
           
            
            //console.log(messages);
            //return false;
            //console.log(functions);
            // messages

            var call_response =  openai.createChatCompletion({
                //model: "text-davinci-003", // vinda na documentação
                //model: "gpt-3.5-turbo", // vinda na documentação                            
                model: "gpt-4", // vinda na documentação                            
                max_tokens:200,
                //top_p: 0.5,   
                //max_tokens: 500,
                temperature: 0.9, // Mantém um equilíbrio entre criatividade e coerência (quanto menor mais previsiveis e diretas, quanto maior mais criativas )
                top_p: 0.9,      // Garante respostas variadas sem exagerar na aleatoriedade
                //presence_penalty: 1.2, //  // Evita repetição excessiva de palavras   (de -2.0 à 2.0)  
                presence_penalty: 1.0,    // Evita repetir ideias
                frequency_penalty: 1.2,   // Evita repetir palavras    
                stop: ["bye", "Até logo", "Fui","xau"], // parar qd houver essas palavras    
                //response_format: "json", // gtp-4-turbo      
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
                    //temperature: 0.9, // até 1, quanto maior mais diverso, quanto menor mais preciso
            })
            .then(function(response){
                //console.log(response);
            

                let call;
                //call = response.data.data[0].url;
                //console.log("status: "+response);
                console.log("CHOICE: "+response.data.choices[0]);
                call = response;
                //console.log(call.data);
                var status = response.status;
                var texto_arr = response.data.choices[0].message;
                var texto  = response.data.choices[0].message.content;
                console.log(texto_arr);
                console.log(texto);

                // SETA NO BANCO
                //var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap_ai/"+from; 
                var url_endpointpost = "https://sentience.tec.br/ci/whats/get_dd_wzap_ai/" + from; 
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'roles_ai' : "assistant",
                        'whats' : device,
                        'nome' : "BOT" ,
                        'contato' : from , 
                        'msg' : texto , 
                        'id_user' : 1, 
                        'id_produto' : id_produto , 
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


                client.sendText(message.from,"*"+nome_perfil+"*:\n\n"+texto,message.id)
                .then((result) => {
                    console.log("A.I respondeu com sucesso!");
                    client.setPresence(message.from, 'r');

                    //  GERAR AUDIO
                   var audio_resp = generateVoice(texto,voz)
                    .then(function(resp_voz){
                        client.setPresence(message.from, 'r');

                        //const inputFile = 'voz/'+audio_resp;  // Arquivo original
                        const inputFile = 'voz/output.mp3'; // Arquivo convertido para OGG
                        const outputFile = 'voz/output.ogg'; // Arquivo convertido para OGG

                        const convertedFile =  convertAudio(inputFile, outputFile)
                        .then(function(resp_conv){
                            console.log(resp_conv)

                            client.setPresence(message.from, 'r');
                            let responseAudio =  client.sendAudio(from, "voz/output.ogg")
                            .then(function(call_cesponseAudio){
                                console.log(call_cesponseAudio);
                            })
                            
                           
                        })
                        .catch(function(err){
                            console.log(err)
                        })

                   })

                })
            }).catch(function(err){
                client.sendText(message.from,"Ops, algo deu errado! 😢");
                client.sendText("5581983276882","Ops, algo deu errado! 😢");
                console.log("ERRO CATCH",err);
            })
            
                
            // ############################################################################## X A.I



        }) // xxxxxxxxxxxxxxxxxxxxx then xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        .catch(err => {
            console.error(err); // Trate qualquer erro que possa ocorrer na consulta
        });



        // ######## X CHATGPT ########

    });


     } // x if text ########################################
   }  // Receive an event all the time you receive a message from some contact
})

return client;

}



(async function(){
  let client = await start();
  let response = await client.sendText('558183276882', 'Iniciado!!!');
  console.log(response);
})()