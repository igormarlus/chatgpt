import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import request from "request";
const {req} = request;

dotenv.config();


const configuration = new Configuration({
    //organization: "org-SarhgDICWZSg1lva2tkM1U2C", // cyane
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo", // igor
    apiKey: process.env.OPENAI_API_KEY,
});



const openai = new OpenAIApi(configuration);
/*
const response = await openai.createImageEdit(
    fs.createReadStream("./images/img1.jpeg"),
    fs.createReadStream("./images/img2.jpg"),
    "an apocalypse scenario with cyberpunk suits",
    1,
    "1024x1024"
  );
*/

var q = "Gostaria do manual do massageador em portugues";
// BASE
// ############################## network A.I

//######################################## X POST MANUAL
  ////////////// CALIBRAGENS

// ####################### POST DINAMICO
var cc = 0;
      var check_time_cc = setInterval(function(){ cc++;
        console.log("Request: "+cc);

        // REQUEST
        //https://produtosinovadores.com.br/catalogo/admin/get_produtos_ai
        var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/get_topicos_ai"; 
        request.post({
            url: url_endpointpost,
            form: {
                key: 'value',
                'id_user' : 1,               
            }
        }, function(err, httpResponse, body) {
            return new Promise(function(resolve, reject) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(body);
                    //return false;
                    //console.log("NIVEL USUSARIO:");
                    console.log(body);
                    //var nivel_user = parseInt(body);
                    //console.log("CALL REQUEST: "+body);
                    //console.log(message.type);
                    ///////////////////////////////////////////  NEW CODE
                    const obj = JSON.parse(body);
                    //console.log("call1");
                    //console.log(obj);
                    var id_produto = 0;
                    var nome_produto = "";
                    var prompt_ai = "";
                    var titulo = "";
                    var hash = "";
                    var q = "";
                    // $##############  LISTA
                    for(var h=0; h<obj.length; h++){
                      //console.log("call2");
                      //console.log(obj[h]);
                      console.log("ARRAY json: "+obj.length)
                      if(h <= obj.length){
                          //arr_rows[h] = {title:  obj[h].nome, description: obj[h].descricao  ,rowId: obj[h].id}

                          //console.log(obj[h].modelo);
                          titulo = obj[h].pergunta;
                          if(titulo == null){
                            console.log("Sem perguntas");
                            return false;
                          }
                          q = titulo;
                          nome_produto = obj[h].modelo;
                          id_produto = obj[h].id_produto;
                          hash = obj[h].hash;
                          console.log(nome_produto+" - "+id_produto);
                          //prompt_ai = "Crie um artigo de qualidade e relevante sobre: "+titulo;
                          prompt_ai = "Responda a pergunta: "+titulo;
                          
                          //prompt_ai = "Crie um conteúdo de qualidade contanto a história, curiosidades, cultura e principalmente sobre os pontos turísticos de : "+titulo; // TURISMO - PONTOS TURÍSTICOS
                          console.log("prompt: "+prompt_ai);
                          //arr_rows[h] = {title:  obj[h].modelo, description: "💵 R$ "+obj[h].preco_venda+" \n🗒️ "+obj[h].especificacoes,  rowId: h}
                          // ############################## network A.I
                          const openai = new OpenAIApi(configuration);

                          // MARVEL
                          if(id_produto == 757){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003",
                                prompt: "Marv is a chatbot that reluctantly answers questions with sarcastic responses:You: "+q+"?\nMarv:",
                                temperature: 0.0,
                                max_tokens: 60,
                                top_p: 0.3,
                                frequency_penalty: 0.5,
                                presence_penalty: 0.0,
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X MARVEL

                          // SABIO
                          if(id_produto == 760){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                            max_tokens:100,
                                            top_p: 1.0,
                                            //prompt: q,
                                            prompt: "Eu sou o Sábio. Além de ser sábio eu gosto de compartilhar minha inteligência usando meu conhecimento para ensinar:\n\nYou: "+q+"?\nSábio:",
                                            temperature: 1, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X SABIO

                          // AMIGO
                          if(id_produto == 761){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                max_tokens:100,
                                top_p: 1.0,
                                prompt: "Amigo é um amigo fiel e honesto que gosta muito de conversar:You: "+q+"?\nAmigo:",
                                temperature: 0.6, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X AMIGO

                          // PROFESSORA
                          if(id_produto == 758){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                max_tokens:200,
                                top_p: 1.0,
                                prompt: "Eu sou uma Professora que estou sempre ajudando e incentivando meus alunos a aprender. Tambem ajudo com trabalhos e tarefas escolares :You: "+q+"?\nProfessora:",
                                temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X PROFESSORA



                          // medico
                          if(id_produto == 762){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                max_tokens:200,
                                top_p: 1.0,
                                prompt: "Eu sou o médico te ajudo conhecimentos sobre medicina e tratamentos naturais:You: "+q+"?\nProfessora:",
                                temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X MERDICO


                          // FITNESS
                          if(id_produto == 759){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                //prompt: "Brainstorm some ideas combining VR and fitness:You:"+q+"",
                                prompt: "Brainstorm de ideias para você malhar corretamente e ter o corpo ideal\n:You:"+q+"",
                                temperature: 0.6,
                                max_tokens: 300,
                                top_p: 1.0,
                                frequency_penalty: 1,
                                presence_penalty: 1,
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X FITNESS


                          // SEXOLOGA
                          if(id_produto == 763){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                max_tokens:200,
                                top_p: 1.0,
                                prompt: "Eu sou uma sexologa Estou aqui pra te ajudar com dicas quentes e inteligentes sobre sexo. Gosto muito dar dicar para melhorar o seu rendimento sexual:You: "+q+"?\sexologa:",
                                temperature: 0.7, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X SEXOLOGA



                          // INVESTIDOR
                          if(id_produto == 764){
                            const response1 = openai.createCompletion({
                                model: "text-davinci-003", // vinda na documentação
                                max_tokens:500,
                                top_p: 1.0,
                                prompt: "Eu sou o investidor Estou aqui pra te ajudar com dicas quentes e opções para investir seu capital. Gosto muito dar dicar para melhorar seus investimentos.:You: "+q+"?\sexologa:",
                                temperature: 0.1, // até 1, quanto maior mais diverso, quanto menor mais preciso
                              })
                              .then((response) => {
    
                                //console.log(response);
                                let call;
                                //call = response.data.data[0].url;
                                call = response;
                                var status = response.status;
                                var texto  = response.data.choices[0].text;
                                //console.log(call);
                                console.log("---------------------");
                                //console.log(call.data);
                                console.log("Status: "+status);
                                console.log("Texto do id "+id_produto+": "+texto);
                                // ###########  POST DE RESPOSTA
    
                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                                request.post({
                                    url: url_endpointpost,
                                    form: {                                                        
                                        'hash' : hash,
                                        'resposta' : texto
                                    }
                                }, function(err, httpResponse, body_cad) {
                                    return new Promise(function(resolve, reject) {
                                        console.log("CALL POST");
                                        if (err) {
                                            reject(err);
                                            console.log(err);
                                        } else {
                                            resolve(body_cad);
                                            console.log(body_cad);
                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap
                                
                                // ########### X POST DE RESOPSTA
    
                              }) // x then response1

                          } // X INVESTIDOR

                          // BASE
                          /*
                          const response1 = openai.createCompletion({
                            model: "text-davinci-003", // vinda na documentação
                            max_tokens:50,
                            top_p: 1.0,
                            //frequency_penalty: 0.0,
                            //presence_penalty: 0.0,
                            //stop: ["\n"],
                            prompt: prompt_ai,
                            temperature: 0, // até 1, quanto maior mais diverso, quanto menor mais preciso
                          })
                          .then((response) => {

                            //console.log(response);
                            let call;
                            //call = response.data.data[0].url;
                            call = response;
                            var status = response.status;
                            var texto  = response.data.choices[0].text;
                            //console.log(call);
                            console.log("---------------------");
                            //console.log(call.data);
                            console.log("Status: "+status);
                            console.log("Texto do id "+id_produto+": "+texto);
                            // ###########  POST DE RESPOSTA

                            var url_endpointpost = "https://chatbot-whatsapp-br.com.br/chatbot_gpt/set_resp_ai"; 
                            request.post({
                                url: url_endpointpost,
                                form: {                                                        
                                    'hash' : hash,
                                    'resposta' : texto
                                }
                            }, function(err, httpResponse, body_cad) {
                                return new Promise(function(resolve, reject) {
                                    console.log("CALL POST");
                                    if (err) {
                                        reject(err);
                                        console.log(err);
                                    } else {
                                        resolve(body_cad);
                                        console.log(body_cad);
                                    } // x else if err promiss pos get_dd_wzap
                                }); // x function get_dd_wzap
                            }); // x request post get_dd_wzap
                            
                            // ########### X POST DE RESOPSTA

                          }) // x then response1
                          */
                          
                          
                          // ##############################
                      }
                      
                  } // X FOR

                    //////////////////////////////////////////// X NEW CODE
                } // x else if err promiss pos get_dd_wzap
            }); // x function get_dd_wzap
        }); // x request post get_dd_wzap


      } , 10000);