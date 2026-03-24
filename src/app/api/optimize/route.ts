import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { cvText?: string; jobText?: string } = await req.json();
    const cvText = body.cvText?.trim();
    const jobText = body.jobText?.trim();

    // Validate required fields before calling Gemini.
    if (!cvText || !jobText) {
      return NextResponse.json(
        { error: "CV text and job description are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    // Return a clear configuration error instead of failing deep in SDK.
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const prompt = `
CV:
${cvText}

JOB DESCRIPTION:
${jobText}

Task:
1) Rewrite the professional summary to better match the job.
2) Rewrite experience into 5 strong bullet points.
3) List missing keywords from the job description.
4) Provide an ATS compatibility score from 0 to 100.
Format output in markdown with these exact sections:
- ## Optimized Professional Summary
- ## Optimized Experience Bullets
- ## Missing Keywords
- ## ATS Score
In ATS Score section, include:
- A single numeric score line: "Score: X/100"
- 2 short reasons for the score
Keep the response concise and professional.
`;

    const ai = new GoogleGenAI({ apiKey });

    // Fast + lower-cost model for MVP.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to optimize CV. Please try again." },
      { status: 500 }
    );
  }
}