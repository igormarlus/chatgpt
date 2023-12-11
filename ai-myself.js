import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();



//const superchats = require("superchats");
import superchats from "superchats";
import request from "request";





const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
    apiKey: process.env.OPENAI_API_KEY,
});

//const request = require("request");
//const { req } = request;


  ////////////// CHATBOT SUPERCHAT
  async function start(){
        var id_user = 1; 
        var id_cliente = 31; 
        let client = await superchats.create({
            session: "AI-MYSELF",
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
                console.log("ONACK");
                //console.log(event);

                if(event.fromMe == true && event.type == 'text'){
                    console.log("PEGOU IF FROME");
                    var message = event;
                    var from = message.to;
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

                    var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
                    var posts = 
                        {
                            key: 'value',
                            'roles_ai': "assistant",
                            'whats' : message.device,
                            'nome' : "MYSELF" ,
                            'contato' : message.to , 
                            'to' : message.to , 
                            'msg' : message.content , 
                            'id_user' : id_user, 
                            'my': 1,
                            //'id_produto' : id_produto , 
                            'id_whats' : message.id , 
                            'isgroup' : isgroup , 
                            'id_group' : id_group
                        }
                    ;
                    console.log(posts);
                    request.post({
                        url: url_endpointpost,
                        form: posts
                    }, function(err, httpResponse, body) {
                        return new Promise(function(resolve, reject) {
                            if (err) {
                                reject(err);
                                console.log(err);
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
                }
                // x fromMe

                console.log("FIM");


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
                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'roles_ai': "user",
                        'whats' : message.participant,
                        'nome' : message.pushName ,
                        'contato' : message.from , 
                        'to' : message.device , 
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

                    console.log("NPL conectada...");
                    
                    

                        var pergunta = msg.replace("A.I","");
                        console.log("A.I conectada...");
                        console.log("Pergunta... "+pergunta);

                        

                        // ############################################################################## A.I


                        const openai = new OpenAIApi(configuration);

                        // IMAGEM
                        if(msg.includes("imagem")){
                            console.log("CRIA IMAGEM");

                            const options = {
                                prompt: msg, // Descrição da imagem
                                n: 1, // Número de imagens a serem geradas
                                size: "1024x1024", // Tamanho da imagem
                            }

                            var response = await openai.createImage(options)
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

                        // X IMAGEM

                        function fazerConsulta(from,to=0,q="") {
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

                          // Em algum lugar do seu código, você pode usar a função fazerConsulta:
                          var to = message.participant;
                          
                        fazerConsulta(from,to,msg)
                        .then(body => {
                            console.log(body); // Aqui você pode acessar a resposta da consulta
                            var historico = JSON.parse(body);
                            console.log("Conversa acumulada JSON");

                            var q = pergunta;


                            // FONTE: https://platform.openai.com/docs/guides/gpt-best-practices/strategy-write-clear-instructions
                            // prdutos inovadores

                            var prompt_base = "Meu nome é Igor Marlus, sou programador de sistemas, trabalho com marketing online (SEO e Google Ads). Trabalho Home Office e estou aberto a novos negócios em busca de mais conhecimentos. Atuamente trabalho como Chatbot developer usando NODE JS com Backend com PHP. Responda de forma gentil e educada, usando no máximo 20 palavras e sempre com bom humor e com assuntos relevantes. ";
                            // garota de 22 anos 


                            var base_roles = [];


                            // DELIVERY

                            //var url_endpointpost = "https://chatbot-whatsapp-br.com.br/app/get_cardapio_ai/0/"+id_cliente; 
                            var url_endpointpost = "https://chatbot-whatsapp-br.com.br/app/get_cardapio_ai/0/9999"; 
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
                                            const obj = JSON.parse(data_list);
                                            console.log("obj::::::");
                                            console.log(obj);
                                            //return false;
                                            if(obj != "0" && obj != 0){

                                                var oo = [{title : "Perfil chatbot "}];
                                                var arr_rows = [];
                                                
                                                var cardapio_inicial = " Perfil de resposta: ";
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
                                                var cardapio_inicial = "Gosto de falar sobre tecnologia web (Programação PHP e javascript) e costumo me dedicar a estudar novidades do mercado. Estou aberto a nvos desafios e novas oportunidades. (**Tente responder baseado no histórico da conversa nos roles user e assistant do prompt**)";
                                                //var cardapio_inicial = "Responda com poucas para";
                                            }
                                            
                                            console.log("Parou aqui 1");

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
                                                        "role": "system",
                                                        "content": "Trabalho com PHP desde 2008 (codeigniter e Laravel) e Mysql. Também trabalho com javascript (Node js e Jquery). Também crio campanhas do Google ADS e gosto muito de usar práticas de SEO "
                                                    },
                                                    {
                                                        "role": "system",
                                                        "content": "Família: sou casado com Glebcyane e tenho 5 filhos com ela. ! menina (Sophia) e 4 meninos (Pedrinho, Deyvison, Luquinhas e Samuel)"
                                                    },
                                                    {
                                                        "role": "system",
                                                        "content": "Meu pai faleceu quando eu tinha 5 anos e minha mãe quando eu nasci. Fui criado pela minha avó e minha tia (que chamo de mãe). Comecei a estudar programação cedo com 19 anos e até hoje trabalho como autonomo na área. Já tive uma empresa (Nuvem Lab) com 4 sócios. Atualmente trabalho em casa mas costumo visitar clientes.  "
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
                                            
                                            // ESTUDO
                                            // https://www.youtube.com/watch?v=_r1ipz7k6p8&list=PLYio3GBcDKsPP2_zuxEp8eCulgFjI5a3g&index=7
                                            // https://www.youtube.com/watch?v=fe5dSQbSVV4

                                            ///////////////////////////////////////////// COLOCAR DE VOLTA PARA RESPONDER
                                            return false;

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
                                                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
                                                request.post({
                                                    url: url_endpointpost,
                                                    form: {
                                                        key: 'value',
                                                        'roles_ai' : "assistant",
                                                        'whats' : message.to,
                                                        'nome' : "AI-MYSELF" ,
                                                        'contato' : from , 
                                                        'msg' : texto , 
                                                        'id_user' : id_user, 
                                                        'id_produto' : 8 , 
                                                        'id_whats' : "111" , 
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

                                        } // x else if err promiss pos get_dd_wzap
                                    }); // x function get_dd_wzap
                                }); // x request post get_dd_wzap


                        }) // xxxxxxxxxxxxxxxxxxxxx then xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        .catch(err => {
                            console.error(err); // Trate qualquer erro que possa ocorrer na consulta
                        });
                        
                    
                        
                        // #################   NOVO CODIGO ######################
                       

                       
                    return false;

                    // #########################################



                } // x if text



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


 