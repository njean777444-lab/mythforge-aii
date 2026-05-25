import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-5.5",
    messages: [
      {
        role: "system",
        content: `
You are a cinematic fantasy Dungeon Master.
Generate immersive storytelling,
NPC dialogue, combat narration,
and dynamic quests.
        `,
      },
      {
        role: "user",
        content: body.message,
      },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
