import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();
import request from "request";

import * as superchats from 'superchats';
const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
    apiKey: process.env.OPENAI_API_KEY,
});
const {req} = request;


  ////////////// CHATBOT SUPERCHAT
  async function start(){
        var id_user = 36; 
        var id_cliente = 36; 
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
                //jquery.post("https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from , {'nome' : message.pushName ,'contato' : message.from , 'msg' : message.content , 'id_user' : id_user, 'id_produto' : id_produto , 'id_whats' : id_msg_whats , 'isgroup' : isgroup , 'id_group' : id_group  } , function(data_call){
                var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_dd_wzap/"+from; 
                request.post({
                    url: url_endpointpost,
                    form: {
                        key: 'value',
                        'whats' : message.to,
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
                    //if(msg === "A.I"){
                    

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

                        function fazerConsulta(from) {
                            return new Promise((resolve, reject) => {
                              const url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_conversa_wzap/" + from;
                          
                              request.post({
                                url: url_endpointpost,
                                form: {
                                  key: 'value',
                                  'roles_ai': "user",
                                  'whats': from,
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
                        fazerConsulta(from)
                        .then(body => {
                            console.log(body); // Aqui você pode acessar a resposta da consulta
                            var historico = JSON.parse(body);
                            console.log("Conversa acumulada JSON");

                            var q = pergunta;
                            var produtos_pi = "10 Passos para o Abdome Perfeito: (Link: https://go.hotmart.com/B22517770T) 360 Câmera Espiã: (Link: https://app.monetizze.com.br/r/AVA20673747) 5 Dicas MATADORAS Para Perder Gordura Abdominal – 100% GARANTIDO!: (Link: https://go.hotmart.com/P11637566U?ap=6900) 7 Vitaminas Naturais para Energizar o seu Treino: (Link: https://go.hotmart.com/F21907939C) A Bíblia - Da Origem aos nossos dias: (Link: https://go.hotmart.com/C69802080Y) A Máquina De Vendas Online 2019: (Link: https://go.hotmart.com/N11947058B) Abacaxi Ananás: (Link: https://go.hotmart.com/X43494413W) Acabe com a Insônia e Dobre Sua Produtividade: (Link: https://app.monetizze.com.br/r/ALE8148803) Alfabetinho: (Link: https://go.hotmart.com/E69257321Q) Alienação: (Link: https://go.hotmart.com/R57822786L) Alivie suas dores na lombar em casa: (Link: https://go.hotmart.com/V37867259H) Aprenda a adestrar o seu cão Passo a Passo: (Link: https://go.hotmart.com/G13133228R) Aprenda a Fazer Massagem: (Link: https://claudioamaral40.wixsite.com/massagem?mcr=AUG5794405) Automassagem Express para dor nas costas: (Link: https://go.hotmart.com/R38210043V) Banana: (Link: https://go.hotmart.com/Y58349312F) Banco do Brasil: (Link: https://www.bb.com.br/pbb/pagina-inicial) Bom Dia Amor: (Link: https://app.monetizze.com.br/r/ANR16939821) Bônus Betfair: (Link: https://ads.betfair.com/redirect.aspx?pid=2816870&bid=8142) Bose QuietComfort 35: (Link: https://shope.ee/1AnxJnomWW) Bot para Whatsapp: (Link: https://api.whatsapp.com/send?phone=5581999468046) Bottox Caps: (Link: https://app.monetizze.com.br/r/AXK12353170) Cachorro saudavel: (Link: https://go.hotmart.com/D37857836P) Calça Feminina Jeans moda rasgada cós alto com lycra: (Link: https://compre.vc/v2/35410738b10) Calça Legging Montaria Feminina: (Link: https://compre.vc/v2/3542c741aa4) Canguru Baby: (Link: https://shope.ee/8euAkUmWxM) Cerveja Gelada: (Link: https://go.hotmart.com/T43498055J) Chatbot com Inteligência Artificial: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) chatbot GPT: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) Chatbot para restaurantes: (Link: https://chatbot-whatsapp-br.com.br/chatbot/restaurantes) Chega de Dor nas Costas: (Link: https://go.hotmart.com/K37866941M) Ciclic: (Link: http://acesse.vc/v2/3547164650e) Cinta Corretora Sweat Belt: (Link: https://app.monetizze.com.br/r/ANB3842951) Colchão Magnético com Massageador e Energia Quântica Cromoterapia Casal: (Link: https://shope.ee/20Nr00Jpns) Como conquistar um homem: (Link: https://go.hotmart.com/L73969787N) Como curar dor de cabeça de ressaca: (Link: https://go.hotmart.com/M13018325G) Como Fazer Pilates em Casa: (Link: https://go.hotmart.com/P37147085Q) Como modelar e confeccionar blusas: (Link: https://go.hotmart.com/W12636273K) Como obter Abdômen perfeito: (Link: https://app.monetizze.com.br/r/AHT8081432) Como salvar seu casamento em 30 dias: (Link: https://go.hotmart.com/F78960087G?ap=daf2) Crise de ansiedade: (Link: https://go.hotmart.com/G66599192V) Curso de Excel ONLINE: (Link: https://go.hotmart.com/Q19468911B) Curso de PHP orientado a objetos: (Link: https://go.hotmart.com/V24584591J) Curso Maquiagem na Web: (Link: https://go.hotmart.com/X78191782H) Curso unhas (Manicure e Pedicure): (Link: https://go.hotmart.com/I25888380O) Desafio 27 Dias Para Secar : (Link: https://go.hotmart.com/V21968755Q) Desafio 30 Dias Para Secar: (Link: https://go.hotmart.com/V22039445J) DESAFIO DETOX: (Link: https://go.hotmart.com/E21907932J) Desdobramentos para loterias: (Link: https://go.hotmart.com/T14726935N) DESOCLUSÃO DESCOMPLICADA: (Link: https://www.desoclusao.com.br/agora) Destruindo a Ejaculação Precoce: (Link: https://go.hotmart.com/G79724829P) ";
                            var produtos_pi2 = "Detox de 3 Dias para Desinchar o Corpo: (Link: https://go.hotmart.com/E21907932J) Detox Vittanatus - Amostra Grátis: (Link: https://app.monetizze.com.br/r/ACN20017443) Dieta de 17 Dias: (Link: https://go.hotmart.com/T43262303M) Dor de Cabeça: (Link: https://go.hotmart.com/N12880618Y) Duropau: (Link: https://app.monetizze.com.br/r/AJN20737394) EDUCAÇÃO INFANTIL: DESAFIOS NA FORMAÇÃO DO FILHO E ALUNO DE HOJE: (Link: https://go.hotmart.com/I12255275X) Elastico Para Exercicio Musculação Revoflex Xtreme Para Abdominal - Rpc : (Link: https://compre.vc/v2/982156cda1) Emagrecer De Vez: (Link: https://go.hotmart.com/T43262303M) Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Equilibrando Sua Energia: (Link: https://go.hotmart.com/P12340283D) Escola Designer de Unhas: (Link: https://go.hotmart.com/F69242818P) Fábrica de Ovos Gourmet: (Link: https://go.hotmart.com/Q69242721D) Fechamento de 20 e 25 dezenas na Quina visando os 4 acertos: (Link: https://p.eduzz.com/312871?a=99196364) Fechamento Loto4fácil - elimine 4 dezenas e faça 14 pontos: (Link: https://p.eduzz.com/306447?a=99196364) Fechamento Lotofácil 23 e 24 dezenas - aumente suas chances de ganhar: (Link: https://p.eduzz.com/306316?a=99196364) Fechamento Lotofácil com 24 dezenas - aumente suas chances: (Link: https://p.eduzz.com/306430?a=99196364) Feitiço de Amor: (Link: https://app.monetizze.com.br/r/AVU16953387) Fórmula Alpha: (Link: https://go.hotmart.com/F28415444T) Formula Negócio Online: (Link: https://pay.hotmart.com/A1412453A) Geração Compartilhada - Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Gestão de Pastagens: (Link: https://go.hotmart.com/G13135150E) HIIT Overpowering : (Link: https://go.hotmart.com/J26276513D) HIPNOSE SEXUAL: (Link: https://go.hotmart.com/U69244028Y) Icsee Manual em Português: (Link: https://compre.vc/v2/1935be0cf80) iPhone: (Link: https://shope.ee/3fVJwkGnKC) JUAN CARLOS CASTRO CUADRADO: (Link: https://produtosinovadores.com.br/catalogo/juancarlos/optin/neuro-persuasin/) LANCHE ESCOLAR SAUDÁVEL!: (Link: https://go.hotmart.com/S20836168N) Leadlovers: (Link: https://go.hotmart.com/Y11800010U) Leite Dourado ou Golden Milk: (Link: http://oferta.vc/v2/339c8f99a2d) LivoChat - Chat Online: (Link: https://chatbot-whatsapp-br.com.br) Livre da Enxaqueca: (Link: https://go.hotmart.com/N12880618Y) Lomadee Afiliados: (Link: https://redir.lomadee.com/v2/3433e506de7) Lotofácil - Planilha Desdobramento Lotofácil 18 E 19 Dezenas - conferidor: (Link: https://p.eduzz.com/50147?a=99196364) Lotofácil 25 Dezenas: (Link: https://p.eduzz.com/110403?a=99196364) MacBook: (Link: https://shope.ee/2AgWowLfm5) Maquiagem Artística Curso: (Link: https://go.hotmart.com/X78191782H) Maquineta Mercado Pago: (Link: https://mpago.li/2UYwYoH) MASSAGEADOR 3D RELAX: (Link: https://redir.lomadee.com/v2/284022af19f) Massageador Com Infravermelho Ponto De Percussão (110v): (Link: https://compre.vc/v2/337ff55f1b1) Massageador de Fisioterapia e Acupuntura: (Link: https://app.monetizze.com.br/r/AYK21338696) Massageador Phoenix: (Link: https://compre.vc/v2/4541c4333a) MASSAGEM MENTAL - HIPNOSE: (Link: https://eduzz.com/curso/ZUFK/.html?a=99196364) Mentes Ativas Rendas Passivas: (Link: http://mon.net.br/8qovp) Método Secar Barriga: (Link: https://go.hotmart.com/R19496812V) NatuProst: (Link: https://ev.braip.com/ref?pv=proejd2v&af=afiv0qe9q) Negócio Online Automático: (Link: https://go.hotmart.com/B12013835G) Nest Learning Thermostat: (Link: https://shope.ee/2fcl1B8CeG) O que não te disseram sobre dores nas costas: (Link: https://chegadedornascostas.mobirisesite.com/?ref=K37866941M) Opções Binarias e Robôs: (Link: https://app.monetizze.com.br/r/AMQ9908388) Pacote para Afiliados: (Link: https://produtosinovadores.com.br/pacote-afiliados/lp.php) ";

                            var conversa = [];
                            conversa.push(q);
                            conversa.push(produtos_pi);
                            //conversa.push(produtos_pi2);


                            //var prompt_base = "Eu sou uma atendente virtual de um site onde oferecemos vários produtos online e você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso site. Responda a pergunta dele sempre com educação. Não precisa criar textos longos, apenas ofereça 1 produto com link por vez.";
                            var prompt_base = "Eu sou uma atendente que vende chatbot para whatsapp, tente convencer o usuário dos benfícios de ter um atendimento automatizado e os ganhos na produtividade  de um site onde oferecemos vários produtos online e você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra no nosso produto chatbot para whatsapp. Responda a perguntas sempre com educação e de forma persuaviva. Nossos preços são: A partir de R$ 500,00 para desenvolver o robo e mensalidades a partir de R$ 99,00 (dependendo dos recursos que vai exigir).";
                            //var prompt_base = "Considere que você é uma atendente  de um restaurante  onde oferecemos vários sabores de pizzas para delivery online.  Você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso estabelecimento. Responda a pergunta dele sempre com educação. Nosso cardápio é Pizza mussarela R$ 59,00, Pizza calabresa R$ 69,00, Pizza portuguesa R$ 79,00, suco e refrigerante é R$ 10,00 2 litros.   ";
                            //var prompt_base = "Considere que você é uma atendente  de um sistema de gerenciamento de encomendas de condomínios/apartamentos,  onde oferecemos suporte aos moradores quando eles estão com problemas com cadastro e as entregas usando o sistema. Normalmente perguntamos o bloco e apartamento do morador e tentamos ajudar nesses procedimentos. No sistema basicamente consiste em um funcionário do condomínio cadastrar uma nova encomenda que chega para o morador, nesse momento o morador recebe uma notificação no whatsapp com o código da encomenda, logo após ele usa esse código para receber a encomenda e levar para sua moradia. Nos ajude a resolver casos que envolvam essas questões. Atualmente estamos em condomínios: Piedade life (link: https://connextelecom.com/encomendas/admin/cadastro/6), Praia de Piedade (link: https://connextelecom.com/encomendas/admin/cadastro/2046), Costa das rochas (link: https://connextelecom.com/encomendas/admin/cadastro/8085), ";
                            //var prompt_base = "Considere que você é uma mulher a procura de um novo relacionamento amoroso, mas é uma pessoa tão fávil de conquistar, porém gosta muito de conversar e puxa assuntos interessantes com quem conversa com você. Seu nome é Eduarda mas te chamam de Duda, Você mora em Recife, no bairro da boa vista e gosta de ir para barzinhos na zona sul da cidade. Gosta de sair apenas com 1 pessoa para conhecê-la melhor, e normalmente é uma pessoa discreta. Tenha uma boa conversa e seja um pouco sexi com as palavras.";
                            //var response = await openai.createCompletion({
                            var base_roles = [];
                            
                            var base_system = 
                                {
                                    "role" : "system",
                                    "content" : prompt_base
                                };
                            //var base_system_json = JSON.parse(base_system);

                            var last_pergunta = 
                                {
                                    "role" : "user",
                                    "content" : q
                                };
                            //var last_pergunta_json = JSON.parse(last_pergunta);

                            console.log("ROLES::::");

                            base_roles.push(base_system);
                            //base_roles.push(historico);
                            base_roles.push(last_pergunta);
                            console.log(base_roles);

                            var call_response =  openai.createChatCompletion({
                                //model: "text-davinci-003", // vinda na documentação
                                model: "gpt-3.5-turbo", // vinda na documentação                            
                                max_tokens:60,
                                top_p: 1.0,                            
                                //prompt: prompt_base + ": " + conversa.join(' '),
                                messages: [

                                    {
                                        "role" : "system",
                                        "content" : prompt_base
                                    },
                                    // {
                                    //     "role" : "assistant",
                                    //     "content" : "Se alguem perguntar sobre algum desses produtos a seguir, pode enviar o link com uma breve descrição sobre ele:10 Passos para o Abdome Perfeito: (Link: https://go.hotmart.com/B22517770T) 360 Câmera Espiã: (Link: https://app.monetizze.com.br/r/AVA20673747) 5 Dicas MATADORAS Para Perder Gordura Abdominal – 100% GARANTIDO!: (Link: https://go.hotmart.com/P11637566U?ap=6900) 7 Vitaminas Naturais para Energizar o seu Treino: (Link: https://go.hotmart.com/F21907939C) A Bíblia - Da Origem aos nossos dias: (Link: https://go.hotmart.com/C69802080Y) A Máquina De Vendas Online 2019: (Link: https://go.hotmart.com/N11947058B) Abacaxi Ananás: (Link: https://go.hotmart.com/X43494413W) Acabe com a Insônia e Dobre Sua Produtividade: (Link: https://app.monetizze.com.br/r/ALE8148803) Alfabetinho: (Link: https://go.hotmart.com/E69257321Q) Alienação: (Link: https://go.hotmart.com/R57822786L) Alivie suas dores na lombar em casa: (Link: https://go.hotmart.com/V37867259H) Aprenda a adestrar o seu cão Passo a Passo: (Link: https://go.hotmart.com/G13133228R) Aprenda a Fazer Massagem: (Link: https://claudioamaral40.wixsite.com/massagem?mcr=AUG5794405) Automassagem Express para dor nas costas: (Link: https://go.hotmart.com/R38210043V) Banana: (Link: https://go.hotmart.com/Y58349312F) Banco do Brasil: (Link: https://www.bb.com.br/pbb/pagina-inicial) Bom Dia Amor: (Link: https://app.monetizze.com.br/r/ANR16939821) Bônus Betfair: (Link: https://ads.betfair.com/redirect.aspx?pid=2816870&bid=8142) Bose QuietComfort 35: (Link: https://shope.ee/1AnxJnomWW) Bot para Whatsapp: (Link: https://api.whatsapp.com/send?phone=5581999468046) Bottox Caps: (Link: https://app.monetizze.com.br/r/AXK12353170) Cachorro saudavel: (Link: https://go.hotmart.com/D37857836P) Calça Feminina Jeans moda rasgada cós alto com lycra: (Link: https://compre.vc/v2/35410738b10) Calça Legging Montaria Feminina: (Link: https://compre.vc/v2/3542c741aa4) Canguru Baby: (Link: https://shope.ee/8euAkUmWxM) Cerveja Gelada: (Link: https://go.hotmart.com/T43498055J) Chatbot com Inteligência Artificial: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) chatbot GPT: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) Chatbot para restaurantes: (Link: https://chatbot-whatsapp-br.com.br/chatbot/restaurantes) Chega de Dor nas Costas: (Link: https://go.hotmart.com/K37866941M) Ciclic: (Link: http://acesse.vc/v2/3547164650e) Cinta Corretora Sweat Belt: (Link: https://app.monetizze.com.br/r/ANB3842951) Colchão Magnético com Massageador e Energia Quântica Cromoterapia Casal: (Link: https://shope.ee/20Nr00Jpns) Como conquistar um homem: (Link: https://go.hotmart.com/L73969787N) Como curar dor de cabeça de ressaca: (Link: https://go.hotmart.com/M13018325G) Como Fazer Pilates em Casa: (Link: https://go.hotmart.com/P37147085Q) Como modelar e confeccionar blusas: (Link: https://go.hotmart.com/W12636273K) Como obter Abdômen perfeito: (Link: https://app.monetizze.com.br/r/AHT8081432) Como salvar seu casamento em 30 dias: (Link: https://go.hotmart.com/F78960087G?ap=daf2) Crise de ansiedade: (Link: https://go.hotmart.com/G66599192V) Curso de Excel ONLINE: (Link: https://go.hotmart.com/Q19468911B) Curso de PHP orientado a objetos: (Link: https://go.hotmart.com/V24584591J) Curso Maquiagem na Web: (Link: https://go.hotmart.com/X78191782H) Curso unhas (Manicure e Pedicure): (Link: https://go.hotmart.com/I25888380O) Desafio 27 Dias Para Secar : (Link: https://go.hotmart.com/V21968755Q) Desafio 30 Dias Para Secar: (Link: https://go.hotmart.com/V22039445J) DESAFIO DETOX: (Link: https://go.hotmart.com/E21907932J) Desdobramentos para loterias: (Link: https://go.hotmart.com/T14726935N) DESOCLUSÃO DESCOMPLICADA: (Link: https://www.desoclusao.com.br/agora) Destruindo a Ejaculação Precoce: (Link: https://go.hotmart.com/G79724829P) "
                                    // },
                                    // {
                                    //     "role" : "assistant",
                                    //     "content" : "Detox de 3 Dias para Desinchar o Corpo: (Link: https://go.hotmart.com/E21907932J) Detox Vittanatus - Amostra Grátis: (Link: https://app.monetizze.com.br/r/ACN20017443) Dieta de 17 Dias: (Link: https://go.hotmart.com/T43262303M) Dor de Cabeça: (Link: https://go.hotmart.com/N12880618Y) Duropau: (Link: https://app.monetizze.com.br/r/AJN20737394) EDUCAÇÃO INFANTIL: DESAFIOS NA FORMAÇÃO DO FILHO E ALUNO DE HOJE: (Link: https://go.hotmart.com/I12255275X) Elastico Para Exercicio Musculação Revoflex Xtreme Para Abdominal - Rpc : (Link: https://compre.vc/v2/982156cda1) Emagrecer De Vez: (Link: https://go.hotmart.com/T43262303M) Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Equilibrando Sua Energia: (Link: https://go.hotmart.com/P12340283D) Escola Designer de Unhas: (Link: https://go.hotmart.com/F69242818P) Fábrica de Ovos Gourmet: (Link: https://go.hotmart.com/Q69242721D) Fechamento de 20 e 25 dezenas na Quina visando os 4 acertos: (Link: https://p.eduzz.com/312871?a=99196364) Fechamento Loto4fácil - elimine 4 dezenas e faça 14 pontos: (Link: https://p.eduzz.com/306447?a=99196364) Fechamento Lotofácil 23 e 24 dezenas - aumente suas chances de ganhar: (Link: https://p.eduzz.com/306316?a=99196364) Fechamento Lotofácil com 24 dezenas - aumente suas chances: (Link: https://p.eduzz.com/306430?a=99196364) Feitiço de Amor: (Link: https://app.monetizze.com.br/r/AVU16953387) Fórmula Alpha: (Link: https://go.hotmart.com/F28415444T) Formula Negócio Online: (Link: https://pay.hotmart.com/A1412453A) Geração Compartilhada - Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Gestão de Pastagens: (Link: https://go.hotmart.com/G13135150E) HIIT Overpowering : (Link: https://go.hotmart.com/J26276513D) HIPNOSE SEXUAL: (Link: https://go.hotmart.com/U69244028Y) Icsee Manual em Português: (Link: https://compre.vc/v2/1935be0cf80) iPhone: (Link: https://shope.ee/3fVJwkGnKC) JUAN CARLOS CASTRO CUADRADO: (Link: https://produtosinovadores.com.br/catalogo/juancarlos/optin/neuro-persuasin/) LANCHE ESCOLAR SAUDÁVEL!: (Link: https://go.hotmart.com/S20836168N) Leadlovers: (Link: https://go.hotmart.com/Y11800010U) Leite Dourado ou Golden Milk: (Link: http://oferta.vc/v2/339c8f99a2d) LivoChat - Chat Online: (Link: https://chatbot-whatsapp-br.com.br) Livre da Enxaqueca: (Link: https://go.hotmart.com/N12880618Y) Lomadee Afiliados: (Link: https://redir.lomadee.com/v2/3433e506de7) Lotofácil - Planilha Desdobramento Lotofácil 18 E 19 Dezenas - conferidor: (Link: https://p.eduzz.com/50147?a=99196364) Lotofácil 25 Dezenas: (Link: https://p.eduzz.com/110403?a=99196364) MacBook: (Link: https://shope.ee/2AgWowLfm5) Maquiagem Artística Curso: (Link: https://go.hotmart.com/X78191782H) Maquineta Mercado Pago: (Link: https://mpago.li/2UYwYoH) MASSAGEADOR 3D RELAX: (Link: https://redir.lomadee.com/v2/284022af19f) Massageador Com Infravermelho Ponto De Percussão (110v): (Link: https://compre.vc/v2/337ff55f1b1) Massageador de Fisioterapia e Acupuntura: (Link: https://app.monetizze.com.br/r/AYK21338696) Massageador Phoenix: (Link: https://compre.vc/v2/4541c4333a) MASSAGEM MENTAL - HIPNOSE: (Link: https://eduzz.com/curso/ZUFK/.html?a=99196364) Mentes Ativas Rendas Passivas: (Link: http://mon.net.br/8qovp) Método Secar Barriga: (Link: https://go.hotmart.com/R19496812V) NatuProst: (Link: https://ev.braip.com/ref?pv=proejd2v&af=afiv0qe9q) Negócio Online Automático: (Link: https://go.hotmart.com/B12013835G) Nest Learning Thermostat: (Link: https://shope.ee/2fcl1B8CeG) O que não te disseram sobre dores nas costas: (Link: https://chegadedornascostas.mobirisesite.com/?ref=K37866941M) Opções Binarias e Robôs: (Link: https://app.monetizze.com.br/r/AMQ9908388) Pacote para Afiliados: (Link: https://produtosinovadores.com.br/pacote-afiliados/lp.php) "
                                    // },
                                    //historico,
                                    {
                                        "role" : "user",
                                        "content" : q
                                    }

                                ],
                                temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                            })
                            .then(function(response){

                            

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
                                        'whats' : from,
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



                        }) // xxxxxxxxxxxxxxxxxxxxx then xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        .catch(err => {
                            console.error(err); // Trate qualquer erro que possa ocorrer na consulta
                        });



                        // // SETA NO BANCO
                        // var url_endpointpost = "https://chatbot-whatsapp-br.com.br/whats/get_conversa_wzap/"+from; 
                        // request.post({
                        //     url: url_endpointpost,
                        //     form: {
                        //         key: 'value',
                        //         'roles_ai' : "user",
                        //         'whats' : from,
                        //     }
                        // }, function(err, httpResponse, body) {
                        //     return new Promise(function(resolve, reject) {
                        //         if (err) {
                        //             reject(err);
                        //         } else {
                        //             resolve(body);
                        //             console.log(body);                                    
                        //             console.log("Conversa acumulada JSON ");                                    
                        //         } // x else if err promiss pos get_dd_wzap
                        //     }); // x function get_dd_wzap
                        // }); // x request post get_dd_wzap

                        //return false; // evita consulta no chatgpt
                        
                        
                        
                        var q = pergunta;
                        var produtos_pi = "10 Passos para o Abdome Perfeito: (Link: https://go.hotmart.com/B22517770T) 360 Câmera Espiã: (Link: https://app.monetizze.com.br/r/AVA20673747) 5 Dicas MATADORAS Para Perder Gordura Abdominal – 100% GARANTIDO!: (Link: https://go.hotmart.com/P11637566U?ap=6900) 7 Vitaminas Naturais para Energizar o seu Treino: (Link: https://go.hotmart.com/F21907939C) A Bíblia - Da Origem aos nossos dias: (Link: https://go.hotmart.com/C69802080Y) A Máquina De Vendas Online 2019: (Link: https://go.hotmart.com/N11947058B) Abacaxi Ananás: (Link: https://go.hotmart.com/X43494413W) Acabe com a Insônia e Dobre Sua Produtividade: (Link: https://app.monetizze.com.br/r/ALE8148803) Alfabetinho: (Link: https://go.hotmart.com/E69257321Q) Alienação: (Link: https://go.hotmart.com/R57822786L) Alivie suas dores na lombar em casa: (Link: https://go.hotmart.com/V37867259H) Aprenda a adestrar o seu cão Passo a Passo: (Link: https://go.hotmart.com/G13133228R) Aprenda a Fazer Massagem: (Link: https://claudioamaral40.wixsite.com/massagem?mcr=AUG5794405) Automassagem Express para dor nas costas: (Link: https://go.hotmart.com/R38210043V) Banana: (Link: https://go.hotmart.com/Y58349312F) Banco do Brasil: (Link: https://www.bb.com.br/pbb/pagina-inicial) Bom Dia Amor: (Link: https://app.monetizze.com.br/r/ANR16939821) Bônus Betfair: (Link: https://ads.betfair.com/redirect.aspx?pid=2816870&bid=8142) Bose QuietComfort 35: (Link: https://shope.ee/1AnxJnomWW) Bot para Whatsapp: (Link: https://api.whatsapp.com/send?phone=5581999468046) Bottox Caps: (Link: https://app.monetizze.com.br/r/AXK12353170) Cachorro saudavel: (Link: https://go.hotmart.com/D37857836P) Calça Feminina Jeans moda rasgada cós alto com lycra: (Link: https://compre.vc/v2/35410738b10) Calça Legging Montaria Feminina: (Link: https://compre.vc/v2/3542c741aa4) Canguru Baby: (Link: https://shope.ee/8euAkUmWxM) Cerveja Gelada: (Link: https://go.hotmart.com/T43498055J) Chatbot com Inteligência Artificial: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) chatbot GPT: (Link: https://chatbot-whatsapp-br.com.br/chatbot_gpt/) Chatbot para restaurantes: (Link: https://chatbot-whatsapp-br.com.br/chatbot/restaurantes) Chega de Dor nas Costas: (Link: https://go.hotmart.com/K37866941M) Ciclic: (Link: http://acesse.vc/v2/3547164650e) Cinta Corretora Sweat Belt: (Link: https://app.monetizze.com.br/r/ANB3842951) Colchão Magnético com Massageador e Energia Quântica Cromoterapia Casal: (Link: https://shope.ee/20Nr00Jpns) Como conquistar um homem: (Link: https://go.hotmart.com/L73969787N) Como curar dor de cabeça de ressaca: (Link: https://go.hotmart.com/M13018325G) Como Fazer Pilates em Casa: (Link: https://go.hotmart.com/P37147085Q) Como modelar e confeccionar blusas: (Link: https://go.hotmart.com/W12636273K) Como obter Abdômen perfeito: (Link: https://app.monetizze.com.br/r/AHT8081432) Como salvar seu casamento em 30 dias: (Link: https://go.hotmart.com/F78960087G?ap=daf2) Crise de ansiedade: (Link: https://go.hotmart.com/G66599192V) Curso de Excel ONLINE: (Link: https://go.hotmart.com/Q19468911B) Curso de PHP orientado a objetos: (Link: https://go.hotmart.com/V24584591J) Curso Maquiagem na Web: (Link: https://go.hotmart.com/X78191782H) Curso unhas (Manicure e Pedicure): (Link: https://go.hotmart.com/I25888380O) Desafio 27 Dias Para Secar : (Link: https://go.hotmart.com/V21968755Q) Desafio 30 Dias Para Secar: (Link: https://go.hotmart.com/V22039445J) DESAFIO DETOX: (Link: https://go.hotmart.com/E21907932J) Desdobramentos para loterias: (Link: https://go.hotmart.com/T14726935N) DESOCLUSÃO DESCOMPLICADA: (Link: https://www.desoclusao.com.br/agora) Destruindo a Ejaculação Precoce: (Link: https://go.hotmart.com/G79724829P) ";
                        var produtos_pi2 = "Detox de 3 Dias para Desinchar o Corpo: (Link: https://go.hotmart.com/E21907932J) Detox Vittanatus - Amostra Grátis: (Link: https://app.monetizze.com.br/r/ACN20017443) Dieta de 17 Dias: (Link: https://go.hotmart.com/T43262303M) Dor de Cabeça: (Link: https://go.hotmart.com/N12880618Y) Duropau: (Link: https://app.monetizze.com.br/r/AJN20737394) EDUCAÇÃO INFANTIL: DESAFIOS NA FORMAÇÃO DO FILHO E ALUNO DE HOJE: (Link: https://go.hotmart.com/I12255275X) Elastico Para Exercicio Musculação Revoflex Xtreme Para Abdominal - Rpc : (Link: https://compre.vc/v2/982156cda1) Emagrecer De Vez: (Link: https://go.hotmart.com/T43262303M) Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Equilibrando Sua Energia: (Link: https://go.hotmart.com/P12340283D) Escola Designer de Unhas: (Link: https://go.hotmart.com/F69242818P) Fábrica de Ovos Gourmet: (Link: https://go.hotmart.com/Q69242721D) Fechamento de 20 e 25 dezenas na Quina visando os 4 acertos: (Link: https://p.eduzz.com/312871?a=99196364) Fechamento Loto4fácil - elimine 4 dezenas e faça 14 pontos: (Link: https://p.eduzz.com/306447?a=99196364) Fechamento Lotofácil 23 e 24 dezenas - aumente suas chances de ganhar: (Link: https://p.eduzz.com/306316?a=99196364) Fechamento Lotofácil com 24 dezenas - aumente suas chances: (Link: https://p.eduzz.com/306430?a=99196364) Feitiço de Amor: (Link: https://app.monetizze.com.br/r/AVU16953387) Fórmula Alpha: (Link: https://go.hotmart.com/F28415444T) Formula Negócio Online: (Link: https://pay.hotmart.com/A1412453A) Geração Compartilhada - Energia Solar: (Link: http://oferta.vc/v2/349e02d44f1) Gestão de Pastagens: (Link: https://go.hotmart.com/G13135150E) HIIT Overpowering : (Link: https://go.hotmart.com/J26276513D) HIPNOSE SEXUAL: (Link: https://go.hotmart.com/U69244028Y) Icsee Manual em Português: (Link: https://compre.vc/v2/1935be0cf80) iPhone: (Link: https://shope.ee/3fVJwkGnKC) JUAN CARLOS CASTRO CUADRADO: (Link: https://produtosinovadores.com.br/catalogo/juancarlos/optin/neuro-persuasin/) LANCHE ESCOLAR SAUDÁVEL!: (Link: https://go.hotmart.com/S20836168N) Leadlovers: (Link: https://go.hotmart.com/Y11800010U) Leite Dourado ou Golden Milk: (Link: http://oferta.vc/v2/339c8f99a2d) LivoChat - Chat Online: (Link: https://chatbot-whatsapp-br.com.br) Livre da Enxaqueca: (Link: https://go.hotmart.com/N12880618Y) Lomadee Afiliados: (Link: https://redir.lomadee.com/v2/3433e506de7) Lotofácil - Planilha Desdobramento Lotofácil 18 E 19 Dezenas - conferidor: (Link: https://p.eduzz.com/50147?a=99196364) Lotofácil 25 Dezenas: (Link: https://p.eduzz.com/110403?a=99196364) MacBook: (Link: https://shope.ee/2AgWowLfm5) Maquiagem Artística Curso: (Link: https://go.hotmart.com/X78191782H) Maquineta Mercado Pago: (Link: https://mpago.li/2UYwYoH) MASSAGEADOR 3D RELAX: (Link: https://redir.lomadee.com/v2/284022af19f) Massageador Com Infravermelho Ponto De Percussão (110v): (Link: https://compre.vc/v2/337ff55f1b1) Massageador de Fisioterapia e Acupuntura: (Link: https://app.monetizze.com.br/r/AYK21338696) Massageador Phoenix: (Link: https://compre.vc/v2/4541c4333a) MASSAGEM MENTAL - HIPNOSE: (Link: https://eduzz.com/curso/ZUFK/.html?a=99196364) Mentes Ativas Rendas Passivas: (Link: http://mon.net.br/8qovp) Método Secar Barriga: (Link: https://go.hotmart.com/R19496812V) NatuProst: (Link: https://ev.braip.com/ref?pv=proejd2v&af=afiv0qe9q) Negócio Online Automático: (Link: https://go.hotmart.com/B12013835G) Nest Learning Thermostat: (Link: https://shope.ee/2fcl1B8CeG) O que não te disseram sobre dores nas costas: (Link: https://chegadedornascostas.mobirisesite.com/?ref=K37866941M) Opções Binarias e Robôs: (Link: https://app.monetizze.com.br/r/AMQ9908388) Pacote para Afiliados: (Link: https://produtosinovadores.com.br/pacote-afiliados/lp.php) ";

                        var conversa = [];
                        conversa.push(q);
                        conversa.push(produtos_pi);
                        //conversa.push(produtos_pi2);


                        var prompt_base = "Eu sou uma atendente virtual de um site onde oferecemos vários produtos online e você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso site. Responda a pergunta dele sempre com educação. Não precisa criar textos longos, apenas ofereça 1 produto com link por vez.";
                        //var prompt_base = "Considere que você é uma atendente  de um restaurante  onde oferecemos vários sabores de pizzas para delivery online.  Você tem que ser gentil e persiasiva para convencer o usuário a realizar uma compra em nosso estabelecimento. Responda a pergunta dele sempre com educação. Nosso cardápio é Pizza mussarela R$ 59,00, Pizza calabresa R$ 69,00, Pizza portuguesa R$ 79,00, suco e refrigerante é R$ 10,00 2 litros.   ";
                        //var prompt_base = "Considere que você é uma atendente  de um sistema de gerenciamento de encomendas de condomínios/apartamentos,  onde oferecemos suporte aos moradores quando eles estão com problemas com cadastro e as entregas usando o sistema. Normalmente perguntamos o bloco e apartamento do morador e tentamos ajudar nesses procedimentos. No sistema basicamente consiste em um funcionário do condomínio cadastrar uma nova encomenda que chega para o morador, nesse momento o morador recebe uma notificação no whatsapp com o código da encomenda, logo após ele usa esse código para receber a encomenda e levar para sua moradia. Nos ajude a resolver casos que envolvam essas questões. Atualmente estamos em condomínios: Piedade life (link: https://connextelecom.com/encomendas/admin/cadastro/6), Praia de Piedade (link: https://connextelecom.com/encomendas/admin/cadastro/2046), Costa das rochas (link: https://connextelecom.com/encomendas/admin/cadastro/8085), ";
                        //var prompt_base = "Considere que você é uma mulher a procura de um novo relacionamento amoroso, mas é uma pessoa tão fávil de conquistar, porém gosta muito de conversar e puxa assuntos interessantes com quem conversa com você. Seu nome é Eduarda mas te chamam de Duda, Você mora em Recife, no bairro da boa vista e gosta de ir para barzinhos na zona sul da cidade. Gosta de sair apenas com 1 pessoa para conhecê-la melhor, e normalmente é uma pessoa discreta. Tenha uma boa conversa e seja um pouco sexi com as palavras.";
                        //var response = await openai.createCompletion({
                        var base_roles = [];
                        
                        var base_system = 
                            {
                                "role" : "system",
                                "content" : prompt_base
                            }
                        ;

                        var last_pergunta = 
                            {
                                "role" : "user",
                                "content": q
                            }
                        ;

                        console.log("ROLES::::");

                        base_roles.push(base_system);
                        base_roles.push(last_pergunta);
                        console.log(base_roles);
                        
                        return false;

                        var response = await openai.createChatCompletion({
                            //model: "text-davinci-003", // vinda na documentação
                            model: "gpt-3.5-turbo", // vinda na documentação                            
                            max_tokens:15,
                            top_p: 1.0,                            
                            //prompt: prompt_base + ": " + conversa.join(' '),
                            messages: base_roles,
                            temperature: 0.2, // até 1, quanto maior mais diverso, quanto menor mais preciso
                        });
                        
                        // #################   NOVO CODIGO ######################
                       

                        // ####################################
                        //conversa.push(response);


                        //console.log("Response openai:");
                        //console.log(response);

                        // console.log("Response acumulada:");
                        // console.log(conversa);

                        
                        
                        let call;
                        //call = response.data.data[0].url;
                        console.log("status: "+response.status);
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
                                'whats' : from,
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
                        
                            
                        // ############################################################################## X A.I


                       // })
                   // }

                    return false;

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
                                    var nivel_user_now = 21; // o sabio
                                    console.log(nivel_user_now);
                                    return false;

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


 