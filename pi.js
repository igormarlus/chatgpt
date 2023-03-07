import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import request from "request";
const {req} = request;

dotenv.config();


const configuration = new Configuration({
    organization: "org-moHI7PbTt55tBgM9B2IOeNJo",
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
//let image_url;
//image_url = response.data.data[0].url;
//console.log(image_url);

//var q = "Quais são as melhores formas de adestrar Cachorro?";
//var q = "Qual melhor forma de emagrecer?";
//var q = "Crie um artigo sobre abacaxi";
//var q = "Qual melhor linguagem de programação para trabalhar no Brasil";
//var q = "def foo(n, k):\naccum = 0\nfor i in range(n):\n    for l in range(k):\n        accum += i\nreturn accum\n\"\"\"\nThe time complexity of this function is"; // tempo
//var q = "Como faço para saber a porcentagem de 1 número?";
//var q = "Qual melhor forma de ganhar dinheiro como programador?";
//var q = "Qual estratégia de divulgação que um aplicativo para criar tarefas escolares precisa?";
//var q = "Qual o grande desafio do empreendedor nos dias de hoje?";
//var q = "viu a nova série que lançou na Netflix?";
var q = "Gostaria do manual do massageador em portugues";
// BASE
// ############################## network A.I
//const openai = new OpenAIApi(configuration);
/*
var prompt_ai = "";
prompt_ai = "Cria um texto explicativo e persuasivo sobre o produto Chatbot";
const response1 = openai.createCompletion({
  model: "text-davinci-003", // vinda na documentação
  max_tokens:500,
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

  ////////////////////////// DB
  var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/set_produtos_ai"; 
  request.post({
      url: url_endpointpost,
      form: {                                                        
          'id' : id_produto,
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
  ////////////////////////// x DB

  
  // ########### X POST DE RESOPSTA

}) // x then response1

*/

 //  ISAR SET INTERVAL PARA VARRER O BANCO DE DADOS 



      var cc = 0;
      var check_time_cc = setInterval(function(){ cc++;
        console.log("Request: "+cc);

        // REQUEST
        //https://produtosinovadores.com.br/catalogo/admin/get_produtos_ai
        var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/get_produtos_ai"; 
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
                } else {
                    resolve(body);
                    //console.log("NIVEL USUSARIO:");
                    //console.log(body);
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
                    // $##############  LISTA
                    for(var h=0; h<obj.length; h++){
                      //console.log("call2");
                      //console.log(obj[h]);
                      console.log("ARRAY json: "+obj.length)
                      if(h <= obj.length){
                          //arr_rows[h] = {title:  obj[h].nome, description: obj[h].descricao  ,rowId: obj[h].id}

                          //console.log(obj[h].modelo);
                          nome_produto = obj[h].modelo;
                          id_produto = obj[h].id;
                          console.log(nome_produto);
                          prompt_ai = "Cria um texto explicativo e persuasivo sobre o produto "+nome_produto;
                          console.log("prompt: "+prompt_ai);
                          //arr_rows[h] = {title:  obj[h].modelo, description: "💵 R$ "+obj[h].preco_venda+" \n🗒️ "+obj[h].especificacoes,  rowId: h}
                          // ############################## network A.I
                          const openai = new OpenAIApi(configuration);
                          const response1 = openai.createCompletion({
                            model: "text-davinci-003", // vinda na documentação
                            max_tokens:500,
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

                            ////////////////////////// DB
                            var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/set_produtos_ai"; 
                            request.post({
                                url: url_endpointpost,
                                form: {                                                        
                                    'id' : id_produto,
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
                            ////////////////////////// x DB

                            
                            // ########### X POST DE RESOPSTA

                          }) // x then response1
                          
                          
                          // ##############################
                      }
                      
                  } // X FOR

                    //////////////////////////////////////////// X NEW CODE
                } // x else if err promiss pos get_dd_wzap
            }); // x function get_dd_wzap
        }); // x request post get_dd_wzap


      } , 10000);


//var q = "Classify the sentiment in these tweets:\n\n1. \"Eu gosto de ir a praia\"\n2. \"Muito ruim isso 😠\"\n3. \"Eu espero o carnaval!!!\"\n4. \"Adoro meu gato ❤️❤️\"\n5. \"Odeio calabresa\"\n\nTweet sentiment ratings:"; // sentinento no por frase( twetter)
console.log("OK fim");
/*
 const response = await openai.createCompletion({
    model: "text-davinci-003", // vinda na documentação
    max_tokens:300,
    top_p: 1.0,
    //frequency_penalty: 0.0,
    //presence_penalty: 0.0,
    //stop: ["\n"],
    prompt: q,
    temperature: 0, // até 1, quanto maior mais diverso, quanto menor mais preciso
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
  

  ////////////// CALIBRAGENS

