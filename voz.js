
//const axios = require('axios');
//import axios from 'axios';
//const fs = require('fs');
import axios from 'axios';

import fs from 'fs';
//const player = require('play-sound')();


//const { exec } = require('child_process');

import ffmpeg from 'fluent-ffmpeg';
//import { sendAudio } from 'superchat'; // Ajuste conforme a biblioteca

const inputFile = 'voz/output.mp3';  // Arquivo original
const outputFile = 'voz/output.ogg'; // Arquivo convertido para OGG


// Função para converter áudio para OGG Opus
async function convertAudio(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .toFormat('ogg')
            .audioCodec('libopus') // Codec Opus, essencial para WhatsApp
            .on('end', () => {
                console.log("✅ Conversão concluída:", outputFile);
                resolve(outputFile);
            })
            .on('error', (err) => {
                console.error("❌ Erro ao converter áudio:", err);
                reject(err);
            })
            .save(outputFile);
    });
}


const convertedFile = await convertAudio(inputFile, outputFile);
console.log(convertedFile);
//return convertedFile;

async function listVoices() {
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': 'sk_bbc50ab24a8f302207371c766331a2a63ea09c45e1021180' }
    });
    console.log(response.data);
}

// listVoices();
// return false;

//generateVoice("Esta é uma voz realista gerada pela ElevenLabs.");

// exec('start output.mp3', (err) => {
//     if (err) {
//         console.error("❌ Erro ao tocar o áudio:", err);
//     } else {
//         console.log("🎵 Áudio tocando...");
//     }
// });
// return false;

const API_KEY = 'sk_bbc50ab24a8f302207371c766331a2a63ea09c45e1021180';
const VOICE_ID = 'pqHfZKP75CvOlQylNhV4'; // Substitua pelo ID real da voz
const OUTPUT_FILE = 'output.mp3';

async function generateVoice(text) {
    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                text: text,
                //model_id: 'eleven_monolingual_v1',
                model_id: 'eleven_multilingual_v2',
                voice_settings: { stability: 0.5, similarity_boost: 0.5 }
            },
            {
                headers: {
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        );

        fs.writeFileSync("voz/"+OUTPUT_FILE, response.data);
        console.log("✅ Áudio salvo como", OUTPUT_FILE);

        // Tocar o áudio
        exec('start voz/output.mp3', (err) => {
            if (err) {
                console.error("❌ Erro ao tocar o áudio:", err);
            } else {
                console.log("🎵 Áudio tocando...");
            }
        });
        // player.play(OUTPUT_FILE, (err) => {
        //     if (err) console.error("❌ Erro ao tocar o áudio:", err);
        // });

    } catch (error) {
        console.error("❌ Erro ao gerar a voz:", error.response?.data || error.message);
    }
}

// Teste com um texto
//generateVoice("Olá! Boa noite.");
generateVoice("OK Igor, deu certo!");

