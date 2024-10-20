
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
  session: "AI-v2",
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

     if (message.type == "textMessage" || message.subtype == 'textMessage' || message.subtype == 'text') {
        console.log("mensagem enviada:" );
        console.log(message.content.conversation); // 'Ff'


        // ############################################# 
        console.log("OK 1"); 
        console.log(message);
        var id_user = 1;
        var id_produto = 5555;
        var id_msg_whats = message.id;
        var msg = message.content.conversation;
        //var pergunta = msg.replace("A.I","");
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
                'msg' : message.content.conversation , 
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
        const openai = new OpenAIApi(configuration);

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
        function gerarPromptSindicos() {
            return [
            "Você é um assistente especializado em ajudar síndicos com seus afazeres diários. Suas principais funções incluem gestão de pessoal, acompanhamento de manutenção, controle financeiro e organização de assembleias.",
            "Forneça informações práticas e organize o dia do síndico com recomendações claras para otimizar o tempo e recursos.",
            "Sempre responda as repostas fazendo uma pergunta no final"
            ].join(" ");
        }
        
        function gerarPromptRestaurantes() {
            return [
            "Você é um assistente para ajudar a organizar pedidos em um restaurante.",
            "Gerencie o cardápio, processe pedidos e ajude a calcular valores e tempo estimado de entrega."
            ].join(" ");
        }
        
        function gerarPromptRaspadinhas() {
            return [
            "Você é um assistente para um site de raspadinhas online.",
            "Explique as regras do site e ajude os usuários a entenderem o funcionamento das raspadinhas e como realizar apostas."
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


            // encomendas
            // var prompt_1 = 'você é uma atentender que oferece um sistema de gerenciamento de encomendas para condomínios.  você será uma atendente que vende """sistema de gerenciamento de encomendas com envio de notificações via whatsapp para o morador""", tente convencer o usuário dos benefícios de ter um atendimento automatizado e os ganhos na produtividade. ';
            // var prompt_2 = "Torne a entrega de encomendas no seu condomínio mais prática, rápida e segura.";                                                        
            // var prompt_3 = "Eficiência - Agilize o processo de recebimento e distribuição, reduzindo o tempo de permanência das encomendas e minimizando os espaços físicos. Segurança - Garanta que apenas os moradores autorizados tenham acesso às suas encomendas.Notificações - Informe imediatamente aos moradores sobre a chegada de suas encomendas.";
            // var prompt_4 = "Transparência - Tenha um histórico detalhado das entregas, o que é útil em caso de problemas, reclamações e auditorias. Simplicidade - Cadastre facilmente os moradores, as entregas, e os executores, simplificando todo o processo de administração de correspondências e encomendas.                            Indicadores. Visualize gráficos e indicadores demonstrativos de todas as movimentações das encomendas, notificações e quantidade de moradores, entre outros. Sustentabilidade. Abandone o uso de livros e formulários de entrega, uma vez que as informações são registradas de forma digital. Tenha um registro organizado e fácil de acessar das encomendas recebidas e entregues. ";
            // var prompt_base = prompt_1+prompt_2+prompt_3+prompt_4;

            // var prompt_1 = 'você é uma atentender que oferece um sistema de gerenciamento de encomendas para condomínios.  você será uma atendente que vende """sistema de gerenciamento de encomendas com envio de notificações via whatsapp para o morador""", tente convencer o usuário dos benefícios de ter um atendimento automatizado e os ganhos na produtividade. ';
            // var prompt_2 = "Torne a entrega de encomendas no seu condomínio mais prática, rápida e segura.";                                                        
            // var prompt_3 = "Eficiência - Agilize o processo de recebimento e distribuição, reduzindo o tempo de permanência das encomendas e minimizando os espaços físicos. Segurança - Garanta que apenas os moradores autorizados tenham acesso às suas encomendas.Notificações - Informe imediatamente aos moradores sobre a chegada de suas encomendas.";
            // var prompt_4 = "Transparência - Tenha um histórico detalhado das entregas, o que é útil em caso de problemas, reclamações e auditorias. Simplicidade - Cadastre facilmente os moradores, as entregas, e os executores, simplificando todo o processo de administração de correspondências e encomendas.                            Indicadores. Visualize gráficos e indicadores demonstrativos de todas as movimentações das encomendas, notificações e quantidade de moradores, entre outros. Sustentabilidade. Abandone o uso de livros e formulários de entrega, uma vez que as informações são registradas de forma digital. Tenha um registro organizado e fácil de acessar das encomendas recebidas e entregues. ";
            // var prompt_base = prompt_1+prompt_2+prompt_3+prompt_4;

            var prompt_base = gerarPromptSindicos();


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
                max_tokens:100,
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
                    temperature: 1, // até 1, quanto maior mais diverso, quanto menor mais preciso
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
                        'whats' : to,
                        'nome' : "BOT" ,
                        'contato' : from , 
                        'msg' : texto , 
                        'id_user' : 1, 
                        'id_produto' : 1 , 
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




     } // x if text ########################################
   }  // Receive an event all the time you receive a message from some contact
})

return client;

}



(async function(){
  let client = await start();
  let response = await client.sendText('558199876882', 'Obrigado por usar SuperChats!!!');
  console.log(response);
})()