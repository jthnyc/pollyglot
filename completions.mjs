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
    let prompt = req.body.prompt;
    let language = req.body.language;
    let response = await fetchTextCompletion(prompt, language);
    res.send(response);
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function fetchTextCompletion(tone, prompt, language) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: `You are a fun translator. Provide a ${tone} translation in a phrase. Use example between ### to set the style of response.` },
            {
                role: 'user',
                content: `Translate ${prompt} to ${language}.
                ###
                You can say:
                ###
                `,
            },
        ],
        max_completion_tokens: 40
    });

    return completion.choices[0].message;
}