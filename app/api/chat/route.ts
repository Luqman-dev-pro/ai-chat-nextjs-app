// File: app/api/chat/route.ts

import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'JML Chat App',
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  // const messages = body.messages || [];
  const { messages, model = 'openrouter/auto', temperature = 0.7 } = body;


  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
    });

    const reply = completion.choices?.[0]?.message?.content || 'No response';
    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get response from model' }),
      { status: 500 }
    );
  }
}
