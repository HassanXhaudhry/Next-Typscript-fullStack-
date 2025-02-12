import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "sksvcacct-fhBvEPjjwG-sRZjnyU4KpW7IcIVwDngfVKV0fM1emIk9jLb_sht30LYwGHnKVwT3BlbkFJzi6j3MHJJWiEDb3PT1TtDCdKOeWg14Uo6jw_8jU7pWLwDP9ZE6JqT-P4UuU0kA",
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Error fetching AI response" }, { status: 500 });
  }
}
