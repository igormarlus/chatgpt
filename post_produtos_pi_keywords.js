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


// ####################### POST DINAMICO
    var cc = 0;
    // 189 ejaculacao precoce
    // 253 sugar baby
    var id_produto_key = 253;
      var check_time_cc = setInterval(function(){ cc++;
        console.log("Request: "+cc);

        // REQUEST
        //https://produtosinovadores.com.br/catalogo/admin/get_produtos_ai
        var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/get_keywords_produtos_pi/"+id_produto_key; 
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
                    // $##############  LISTA
                    for(var h=0; h<obj.length; h++){
                      //console.log("call2");
                      //console.log(obj[h]);
                      console.log("ARRAY json: "+obj.length)
                      if(h <= obj.length){
                          //arr_rows[h] = {title:  obj[h].nome, description: obj[h].descricao  ,rowId: obj[h].id}

                          //console.log(obj[h].modelo);
                          titulo = obj[h].key;
                          //nome_produto = obj[h].modelo;
                          id_produto = obj[h].id;
                          console.log(nome_produto);
                          prompt_ai = "Crie um texto de forma humana contextualizando  informações úteis e confiáveis criadas principalmente para beneficiar as pessoas, tendo como assunto principal: "+titulo;
                          //prompt_ai = "Crie um conteúdo de qualidade contanto a história, curiosidades, cultura e principalmente sobre os pontos turísticos de : "+titulo; // TURISMO - PONTOS TURÍSTICOS
                          console.log("prompt: "+prompt_ai);
                          //arr_rows[h] = {title:  obj[h].modelo, description: "💵 R$ "+obj[h].preco_venda+" \n🗒️ "+obj[h].especificacoes,  rowId: h}
                          // ############################## network A.I
                          const openai = new OpenAIApi(configuration);
                          const response1 = openai.createCompletion({
                            model: "text-davinci-003", // vinda na documentação
                            max_tokens:1000,
                            top_p: 1.0,
                            //frequency_penalty: 0.0,
                            //presence_penalty: 0.0,
                            //stop: ["\n"],
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                            prompt: prompt_ai,
                            temperature: 0.3, // até 1, quanto maior mais diverso, quanto menor mais preciso
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

                            var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/import_ai_para_key_pi"; // especificacoes_ai
                            request.post({
                                url: url_endpointpost,
                                form: {                
                                    'id_produto' : id_produto,                                        
                                    'titulo' : titulo,
                                    'conteudo' : texto
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

                            ////////////////////////// DB
                            /*
                            var url_endpointpost = "https://produtosinovadores.com.br/catalogo/ai/set_topicos_ai"; 
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
                            */
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


      } , 30000);