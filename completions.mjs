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
app.use(express.static(path.join(__dirname, 'api')));

app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/gpt', async (req, res) => {
    let prompt = req.body.prompt;
    let language = req.body.language;
    let response = await fetchTextCompletion(prompt, language);
    res.send(response);
})


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function fetchTextCompletion(prompt, language) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a translator who only provides the translation.' },
            {
                role: 'user',
                content: `Translate ${prompt} to ${language}.`,
            },
        ],
    });

    return completion.choices[0].message;
}