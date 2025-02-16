import { NextResponse } from "next/server";

export async function GET(req) {
    const apiKey = process.env.OPENAI_API_KEY;
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic") || "Typography";

    if (!apiKey) {
        console.error("Missing OpenAI API Key");
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const prompt = `Generate 5 multiple-choice questions about ${topic} with 4 answer options each.
    Return a JSON array formatted as follows: 
    [{ "q": "Question text?", "ans": ["A", "B", "C", "D"], "correctAns": "B" }]`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        console.log("Raw API Response:", data);

        // Ensure data is valid
        let questions;
        try {
            questions = JSON.parse(data.choices[0].message.content);
        } catch (parseError) {
            console.error("Error parsing OpenAI response:", parseError);
            return NextResponse.json({ error: "Invalid API response format" }, { status: 500 });
        }

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error fetching from OpenAI:", error);
        return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
    }
}
