import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
// 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 minha key
// org-moHI7PbTt55tBgM9B2IOeNJo minha organization

// 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 chave de cyane
// org-SarhgDICWZSg1lva2tkM1U2C organizarion

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
//var q = "Gostaria do manual do massageador em portugues";
var q = "Faça uma copy persuasiva para venda de um chatbot para delivery tendo como público-alvo donos de restaurantes";
// BASE

//var q = "Classify the sentiment in these tweets:\n\n1. \"Eu gosto de ir a praia\"\n2. \"Muito ruim isso 😠\"\n3. \"Eu espero o carnaval!!!\"\n4. \"Adoro meu gato ❤️❤️\"\n5. \"Odeio calabresa\"\n\nTweet sentiment ratings:"; // sentinento no por frase( twetter)

  const response = await openai.createCompletion({
    model: "text-davinci-003", // vinda na documentação
    //model: "FINE_TUNED_MODEL", // modelo fino
    //model: "código-cushman-001", // nn pegou
    //model: "content-filter-alpha", // resultado loko
    //model: "text-curie-001", // Muito capaz, mas mais rápido e com custo menor que Davinci.
    //model: "texto-babbage-001" ,  // barata e direta
    //prompt: generatePrompt(req.body.animal),
    max_tokens:1500,
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
  
  /////////  X BASE
  

  ////////////// CALIBRAGENS

  // sentimentos
  /*
  var q = "Classify the sentiment in these tweets:\n\n1. \"Eu gosto de ir a praia\"\n2. \"Muito ruim isso 😠\"\n3. \"Eu espero o carnaval!!!\"\n4. \"Adoro meu gato ❤️❤️\"\n5. \"Odeio calabresa\"\n\nTweet sentiment ratings:"; // sentinento no por frase( twetter)
  const sentimentos = await openai.createCompletion({
    model: "text-davinci-003", // vinda na documentação
    max_tokens:64,
    top_p: 1.0,
    //frequency_penalty: 0.0,
    //presence_penalty: 0.0,
    //stop: ["\n"],
    prompt: q,
    temperature: 0, // até 1, quanto maior mais diverso, quanto menor mais preciso
  });
  var resposta  = sentimentos.data.choices[0].text;
  console.log("Texto: "+resposta);
*/
  // frase de marketing
  
  const marketing = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt: "Escreva um anúncio para chatbot de atendimento para restaurantes\n\nproduto voltado para donos de restaurantes e delivery.",
    prompt: q,
    temperature: 0.5,
    max_tokens: 300,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  var resposta2  = marketing.data.choices[0].text;
  console.log("Frase de marketing: "+resposta2);
  

  const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;


  // topicos para projeções
  /*
  const topicos = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Crie tópicos para um planejamento de divulgação para um chatbot para restaurantes",
    temperature: 0.3,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  var resposta3  = topicos.data.choices[0].text;
  console.log("Tópicos: "+resposta3);
  */

  // BATE PAPO COM A.I 1
  /*
  const papo = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
    //prompt: "A seguir, uma conversa com um assistente de IA. O assistente é prestativo, criativo, inteligente e muito amigável.\n\nHumano: Olá, quem é você?\nAI: Sou uma IA criada pela OpenAI. Como posso ajudá-lo hoje?\nHumano: gostaria de cancelar minha assinatura\nAI:",
    prompt: "A seguir, uma conversa com um assistente de IA. O assistente é prestativo, criativo, inteligente e muito amigável.\n\nHumano: Olá, quem é você?\nAI: Sou uma IA criada pela OpenAI. Como posso ajudá-lo hoje?\nHumano: gostaria de saber como trazer meu amor de volta\nAI:",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  var resposta4  = papo.data.choices[0].text;
  console.log("Tópicos: "+resposta4);
*/

// MANUAL
/*
const papo = await openai.createCompletion({
  model: "text-davinci-003",
  //prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  //prompt: "A seguir, uma conversa com um assistente de IA. O assistente é prestativo, criativo, inteligente e muito amigável.\n\nHumano: Olá, quem é você?\nAI: Sou uma IA criada pela OpenAI. Como posso ajudá-lo hoje?\nHumano: gostaria de cancelar minha assinatura\nAI:",
  prompt: "A seguir, uma conversa com um assistente de IA. O assistente é prestativo, criativo, inteligente e muito amigável.\n\nHumano: Olá, preciso do manual do massageador?\nAI: OK! nós temos esse manual. Ele custa R$4,00?\nHumano: gostaria de saber como adiquirir\nAI:",
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
});
var resposta4  = papo.data.choices[0].text;
console.log("Tópicos: "+resposta4);
*/
// BATE PAPO COM A.I 2
/*
var perfil = "ousada, alegre, inteligente e muito safada";
//var pergunta = "gostaria de saber como conquistar uma namorada?";
var pergunta = "Como faço para te conhecer melhor?";
//var pergunta = "Tudo bem com vc?";
//var pergunta = "Tudo bem com vc?";
const papo_garota = await openai.createCompletion({
  model: "text-davinci-003",
  //prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  //prompt: "A seguir, uma conversa com um assistente de IA. O assistente é prestativo, criativo, inteligente e muito amigável.\n\nHumano: Olá, quem é você?\nAI: Sou uma IA criada pela OpenAI. Como posso ajudá-lo hoje?\nHumano: gostaria de cancelar minha assinatura\nAI:",
  prompt: "A seguir, uma conversa com um assistente de IA. A assistente é "+perfil+".\n\nHumano: Olá, quem é você?\nAI: Sou uma Lucy criada por Marlus. Como posso ajudá-lo hoje?\nHumano: "+pergunta+"\nAI:",
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 1,
  stop: [" Human:", " AI:"],
});
var resposta4_2  = papo_garota.data.choices[0].text;
console.log("Tópicos: "+resposta4_2);
*/

 /* 
const nomeProduto = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Product description: Aplicativo para fazer tarefas escolares para alunos do ensino médio",
    temperature: 0.1,
    max_tokens: 200,
    top_p: 1.0,
    //frequency_penalty: 0.0,
    //presence_penalty: 0.0,
  });
  var resposta5  = nomeProduto.data.choices[0].text;
  console.log("Tópicos: "+resposta5);
  */


/*  
  const marv = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: Quais são os melhores investimentos financeiros?\nMarv:",
    temperature: 0.0,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  var resposta6  = marv.data.choices[0].text;
  console.log("Tópicos: "+resposta6);
  */