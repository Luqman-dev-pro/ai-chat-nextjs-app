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
  const { messages, model = 'openrouter/auto', temperature = 0.7 } = body;

  try {
    if(body.rolename == "image_generator"){
      const imageResponse = await openai.images.generate({
           model: "black-forest-labs/flux-1-schnell:free",
          // messages,
          // n: 1,
          // size: '512x512',
          // response_format: 'url',
            // model: 'dall-e-3',
            prompt: 'Generate a natural green blue sky, a road both side fully beauriful trees, on the road a girl walking with a jurkin and back bag she holding the bag trips and she looking slightly top right and smily',
            n: 1,
            size: '512x512',
            response_format: 'url',
        });
// console.log(imageResponse);
      const imageUrl = imageResponse.data?.[0]?.url || null;
      return new Response(JSON.stringify({ imageUrl }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }else{
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature,
        // stream: true,
      });
    
      // let reply = '';
      // for await (const part of completion) {
      //   const response = part.choices[0]?.delta?.content || '';
      //   reply += response;
      // }
      const reply = completion.choices?.[0]?.message?.content || 'No response';
      return new Response(JSON.stringify({ reply }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('OpenAI error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get response from model' }),
      { status: 500 }
    );
  }
}
