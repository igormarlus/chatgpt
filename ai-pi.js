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
            session: "AI",
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
                var url_endpointpost = "https://produtosinovadores.com.br/whats/whats/get_dd_wzap_ai/"+from; 
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'roles_ai': "user",
                        'whats' : message.participant,
                        'nome' : message.pushName ,
                        'contato' : message.from , 
                        'to' : message.to , 
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
                              const url_endpointpost = "https://produtosinovadores.com.br/whats/whats/get_conversa_wzap/" + from;
                          
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
                            

                            // var conversa = [];
                            // conversa.push(q);
                            // conversa.push(produtos_pi);
                            // //conversa.push(produtos_pi2);

                            // FONTE: https://platform.openai.com/docs/guides/gpt-best-practices/strategy-write-clear-instructions
                            // prdutos inovadores
                            var prompt_base = "Responda as perguntas como uma atendente de um site quem vende Produtos físicos e online e materiais (ebooks, vídeos, cursos) para estudos em vários segmentos.Responda como uma pessoa gentil e persiasiva para convencer o usuário a realizar uma compra em nosso site. Responda a pergunta dele sempre em torno de 20 palavras. Não responda textos longos, apenas ofereça 1 produto com **link** (enviado no prompt role system) (pesquise no histórico da conversa assistant) por vez. Quando for informado algum de nossos produtos sempre envie o link e o valor.";
                            // garota de 22 anos 
                            //var prompt_base = "Seu nome é Lucy, converse como uma uma garota de 22 anos, mora em Recife no bairro do espinheiro, não informe exatamente aonde mora. Sempre que responder uma pergunta faça outra de forma sinpática, carismática, elegante e atrativa. gosto de sair e me devertir com minhas amigas. Responde com no máximo 15 palavras  e sempre demostre interesse em continuar a conversa. Não seja tão formal e sim gentil e simpática, buscando sempre continuar a conversa.";


                            // chatgpt
                            // var prompt_1 = 'Quando alguém perguntar algo, você será uma atendente que vende """chatbot para whatsapp""", tente convencer o usuário dos benefícios de ter um atendimento automatizado e os ganhos na produtividade. ';
                            // var prompt_2 = "Retorne textos curtos (cerca de 50 palavras) e objetivos e procure ser gentil e persiasiva para convencer o usuário a realizar uma compra e aderir nosso chatbot automatizado para whatsapp. ";
                            // var prompt_3 = "Nosso produto chatbot para whatsapp. Responda a perguntas sempre com educação e de forma persuaviva. Nossos preços são: A partir de R$ 1.500,00 para desenvolver o robo e mensalidades a partir de R$ 99,00 (dependendo dos recursos que vai exigir).";
                            // prompt_base = prompt_1+prompt_2+prompt_3;


                            // encomendas
                            // var prompt_1 = 'você é uma atentender que oferece um sistema de gerenciamento de encomendas para condomínios.  você será uma atendente que vende """sistema de gerenciamento de encomendas com envio de notificações via whatsapp para o morador""", tente convencer o usuário dos benefícios de ter um atendimento automatizado e os ganhos na produtividade. ';
                            // var prompt_2 = "Torne a entrega de encomendas no seu condomínio mais prática, rápida e segura.";                                                        
                            // var prompt_3 = "Eficiência - Agilize o processo de recebimento e distribuição, reduzindo o tempo de permanência das encomendas e minimizando os espaços físicos. Segurança - Garanta que apenas os moradores autorizados tenham acesso às suas encomendas.Notificações - Informe imediatamente aos moradores sobre a chegada de suas encomendas.";
                            // var prompt_4 = "Transparência - Tenha um histórico detalhado das entregas, o que é útil em caso de problemas, reclamações e auditorias. Simplicidade - Cadastre facilmente os moradores, as entregas, e os executores, simplificando todo o processo de administração de correspondências e encomendas.                            Indicadores. Visualize gráficos e indicadores demonstrativos de todas as movimentações das encomendas, notificações e quantidade de moradores, entre outros. Sustentabilidade. Abandone o uso de livros e formulários de entrega, uma vez que as informações são registradas de forma digital. Tenha um registro organizado e fácil de acessar das encomendas recebidas e entregues. ";
                            // var prompt_base = prompt_1+prompt_2+prompt_3+prompt_4;


                            //var prompt_base = 'Use as instruções passo a passo a seguir para responder às entradas do usuário. Passo 1 - O usuário fornecerá o texto entre aspas triplas. Resuma este texto em uma frase com um prefixo que diz “Resumo:”. Passo 2 - Pergunte as necessiadades que ele tem para obter esse produto. 3 - Mostre os benefícios de comprar um produto para ajudar ele. 4 - Informe o preço e benefícios que ele teria com o produto com um prefixo que diz "preço:".';



                            //var prompt_base = "Considere que você é uma atendente  de um restaurante  onde oferecemos vários sabores de pizzas para delivery online.  Você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso estabelecimento. Responda a pergunta dele sempre com educação. Nosso cardápio é Pizza mussarela R$ 59,00, Pizza calabresa R$ 69,00, Pizza portuguesa R$ 79,00, suco e refrigerante é R$ 10,00 2 litros.   ";
                            //var prompt_base = "Considere que você é uma atendente  de um sistema de gerenciamento de encomendas de condomínios/apartamentos,  onde oferecemos suporte aos moradores quando eles estão com problemas com cadastro e as entregas usando o sistema. Normalmente perguntamos o bloco e apartamento do morador e tentamos ajudar nesses procedimentos. No sistema basicamente consiste em um funcionário do condomínio cadastrar uma nova encomenda que chega para o morador, nesse momento o morador recebe uma notificação no whatsapp com o código da encomenda, logo após ele usa esse código para receber a encomenda e levar para sua moradia. Nos ajude a resolver casos que envolvam essas questões. Atualmente estamos em condomínios: Piedade life (link: https://connextelecom.com/encomendas/admin/cadastro/6), Praia de Piedade (link: https://connextelecom.com/encomendas/admin/cadastro/2046), Costa das rochas (link: https://connextelecom.com/encomendas/admin/cadastro/8085), ";
                            //var prompt_base = "Considere que você é uma mulher a procura de um novo relacionamento amoroso, mas é uma pessoa tão fávil de conquistar, porém gosta muito de conversar e puxa assuntos interessantes com quem conversa com você. Seu nome é Eduarda mas te chamam de Duda, Você mora em Recife, no bairro da boa vista e gosta de ir para barzinhos na zona sul da cidade. Gosta de sair apenas com 1 pessoa para conhecê-la melhor, e normalmente é uma pessoa discreta. Tenha uma boa conversa e seja um pouco sexi com as palavras.";
                            //var response = await openai.createCompletion({
                            var base_roles = [];


                            // DELIVERY

                            var url_endpointpost = "https://produtosinovadores.com.br/whats/app/get_cardapio_ai/0/"+id_cliente; 
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

                                                var oo = [{title : "Catálogo de produtos "}];
                                                var arr_rows = [];
                                                var cardapio_inicial = " Catálogo: ";
                                                // $##############  LISTA
                                                for(var h=0; h<obj.length; h++){
                                                    console.log(obj);
                                                    console.log("ARRAY json: "+obj.length)
                                                    if(h <= obj.length){
                                                        //arr_rows[h] = {title:  obj[h].nome, description: obj[h].descricao  ,rowId: obj[h].id}
                                                        arr_rows[h] = {title:  obj[h].modelo, description: "💵 R$ "+obj[h].preco_venda+" \n🗒️ "+obj[h].especificacoes,  rowId: h}
                                                        //cardapio_inicial += obj[h].modelo+", valor: "+obj[h].preco_venda+", descrição: "+obj[h].especificacoes;
                                                        if( obj[h].preco_venda > 0){                                                            
                                                            cardapio_inicial += obj[h].modelo+", Descrição: "+obj[h].descricao+"  valor: R$ "+obj[h].preco+"["+obj[h].preco+"], link para compra: "+obj[h].link+"["+obj[h].link+"] ";
                                                        }else{
                                                            cardapio_inicial += obj[h].modelo+", Descrição: "+obj[h].descricao+", link para compra: "+obj[h].link+"("+obj[h].link+") ";
                                                        }
                                                        
                                                    }
                                                    
                                                }
                                            } // x if !+ 0
                                            else{
                                                var cardapio_inicial = "Seja gentil, educada e descontraída para poder realizar um bom atendimento e concluir o pedido";
                                            }
                                            //oo[0]['Pratos'] = arr_rows;
                                            console.log(cardapio_inicial);
                                            console.log("Parou aqui 1");
                                            //return false;

                                            //var map = map((prato, index) => `${index + 1}. ${prato.modelo}: ${prato.especificacoes}`).join('\n');
                                            // const cardapioFormatado = `**Cardápio:**\n` +
                                            // data_list.map((prato, index) => `${index + 1}. ${prato.modelo}: ${prato.especificacoes}`).join('\n');

                                            //const prompt_base = `${cardapioFormatado}\nAqui está o cardápio. O que você gostaria de pedir?`;
                                            //const prompt_base = "Você está falando com nosso atendente de um site que oferece produtos inovadores. Aqui está um link para o nossa lista de produtos completo: [Lista completa Completo](https://produtosinovadores.com.br). oferecemos vários produtos online e você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso site. Responda a pergunta dele sempre com educaçãoe em torno de 20 palavras. Não precisa criar textos longos, apenas ofereça 1 produto com link por vez. Como posso ajudar você hoje?";
                                            //const prompt_base = "sou uma garota bem amigavel, gentil, amorosa, cofiavel e bonita. Dê respostas divertidas, carismatica e legais";
                                            //var prompt_base = "Eu sou uma atendente virtual de um site onde oferecemos vários produtos online e você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso site. Responda a pergunta dele sempre com educaçãoe em torno de 20 palavras. Não precisa criar textos longos, apenas ofereça 1 produto com link por vez.";
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

                                            var call_response =  openai.createChatCompletion({
                                                //model: "text-davinci-003", // vinda na documentação
                                                model: "gpt-3.5-turbo", // vinda na documentação                            
                                                max_tokens:150,
                                                //top_p: 1.0,                            
                                                //prompt: prompt_base + ": " + conversa.join(' '),
                                                messages,
                                                temperature: 0.6, // até 1, quanto maior mais diverso, quanto menor mais preciso
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
                                                var url_endpointpost = "https://produtosinovadores.com.br/whats/whats/get_dd_wzap_ai/"+from; 
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
                       

                        
                            
                        // ############################################################################## X A.I


                       // })
                   // }

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


 