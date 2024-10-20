import fs from 'fs';
import { SpeechClient } from '@google-cloud/speech';

async function transcreverAudio(localFilePath, encoding = 'LINEAR16', sampleRateHertz = 16000, languageCode = 'pt-BR') {
  try {
    // Leia o conteúdo do arquivo de credenciais
    const credentialsPath = 'audios/arquivo.json'; // Substitua pelo caminho real
    const credentialsの内容 = fs.readFileSync(credentialsPath, 'utf-8');
    const parsedCredentials = JSON.parse(conteudo);

    // Crie o cliente com as credenciais
    const client = new SpeechClient({ credentials: parsedCredentials });
    //const client = new SpeechClient();

    const audio = {
      content: fs.readFileSync(localFilePath),
    };

    const config = {
      encoding,
      sampleRateHertz,
      languageCode,
    };

    const request = {
      audio,
      config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  } catch (error) {
    console.error('Erro ao transcrever:', error);
    return null;
  }
}

// Exemplo de uso, com a transcrição sendo impressa no console:
const caminhoDoArquivo = '/audios/audio1.opus';
const transcricao = await transcreverAudio(caminhoDoArquivo);
console.log(transcricao);