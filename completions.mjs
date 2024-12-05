import OpenAI from 'openai';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/gpt', async (req, res) => {
    let tone = req.body.tone;
    let prompt = req.body.prompt;
    let language = req.body.language;
    let response = await fetchTextCompletion(tone, prompt, language);
    res.send(response);
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function fetchTextCompletion(tone, prompt, language) {
    let completion = await openai.chat.completions.create({
        model: "gpt-4o-audio-preview",
        modalities: ["text", "audio"],
        audio: { voice: "alloy", format: "mp3" },
        messages: [
            {
                role: 'user',
                content: `Translate ${prompt} to ${tone} ${language} without repeating the phrase in English.`,
            },
        ],
    });
    return completion.choices[0].message;
}