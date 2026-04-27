import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Read fresh on every request — edit these files without restarting the server
    const knowledge = readFileSync(join(__dirname, 'knowledge.txt'), 'utf-8');
    const instructions = readFileSync(join(__dirname, 'instructions.txt'), 'utf-8');

    const systemPrompt = `${instructions}\n\n--- BAZA ZNANJA ---\n${knowledge}`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.slice(-10), // keep last 10 messages
    });

    const reply = response.content.find(b => b.type === 'text')?.text ?? '';
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Greška pri obradi zahtjeva.' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});
