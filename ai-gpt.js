
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


// X PROMPTS

async function start(){
let client = await superchats.create({
  session: "AI-gpt",
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
    
     if ((message.type == "text" || message.subtype == 'text')  && message.content == "hi") {
       await client.sendText(message.from, "Let's GO Superchats");

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

                var response = openai.createImage(options)
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
        //var id_produto = 894; // namorada virtual
        var id_produto = 913; // conselheiro amoroso
        var id_msg_whats = message.id;
        var device = message.device;
        
        var pergunta = msg.replace("A.I","");
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
        console.log(message);
        //jquery.post("https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from , {'nome' : message.pushName ,'contato' : message.from , 'msg' : message.content , 'id_user' : id_user, 'id_produto' : id_produto , 'id_whats' : id_msg_whats , 'isgroup' : isgroup , 'id_group' : id_group  } , function(data_call){
        //var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 

        var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap_ai/" + from; 

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
                    client.sendText(from,"Você não tem mais saldo para fazer perguntas\n\nClique no link abaixo para inserir créditos:\n\nhttps://chatbot-whatsapp-br.com.br/index.php/chatbot_gpt/pagamento/"+id_produto+"/"+from+"\n\n_Perguntas inteligentes, respostas inteligentes_");
                    return false;
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
            //return false;

            var q = pergunta;

            //var prompt_base = gerarPromptNamorada();
            var prompt_base = gerarPromptConselheiroAmoroso();


            var base_roles = [];

            ///////////////////////////  CODIGO A.I PELO chatgpt
            const messages = [
            {
                "role": "system",
                "content": prompt_base
            },
            /*
            {
                "role": "assistant",
                "content": 'Se for enviado um texto que contenha a palavra """sugar""", explique esse conteúdo a seguir: O relacionamento Sugar, foi criado pelos americanos há mais uma década, mas nos últimos anos, criou-se um mercado em torno de pessoas que buscam um relacionamento benéfico para ambos, onde dinheiro não é um tabu. VENHA FAZER PARTE DESSE UNIVERSO. SEJA UMA SUGAR BABY AMBICIOSA.'
            },
            {
                "role" : "assistant",
                "content" : "Após a pessoa demostrar interesse mande o link [https://go.hotmart.com/N78576577V](https://go.hotmart.com/N78576577V) "
            }
            */
            ];

            if(historico != "0" && historico != 0){

                historico.forEach(conversa => {
                    // console.log(conversa.role);                    
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

            var call_response =  openai.createChatCompletion({
                //model: "text-davinci-003", // vinda na documentação
                model: "gpt-3.5-turbo", // vinda na documentação                            
                max_tokens:200,
                top_p: 0.5,                            
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
                //console.log(response);
            

                let call;
                //call = response.data.data[0].url;
                console.log("status: "+response);
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


                client.sendText(message.from,texto,message.id)
                .then((result) => {
                    console.log("A.I respondeu com sucesso!");
                })
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
  let response = await client.sendText('5581876882', 'Iniciado!!!');
  console.log(response);
})()