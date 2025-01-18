import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    console.log("prompt", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates engaging debate topics. Create topics that are balanced, thought-provoking, and suitable for academic debate. Respond in the following JSON format: { title: string, description: string, metadata: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced', category: string, roomIds: string[], slug: string }.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const suggestion = completion.choices[0]?.message?.content;
    if (!suggestion) {
      throw new Error("No suggestion received from OpenAI");
    }

    // Parse the suggestion into JSON
    let parsedSuggestion;
    try {
      parsedSuggestion = JSON.parse(suggestion);
    } catch (error) {
      throw new Error("Failed to parse the suggestion into TopicFormData format");
    }

    // Validate the parsed data (optional but recommended)
    if (
      !parsedSuggestion.title ||
      !parsedSuggestion.description ||
      !parsedSuggestion.metadata ||
      !["Beginner", "Intermediate", "Advanced"].includes(parsedSuggestion.difficulty) ||
      !parsedSuggestion.category ||
      !Array.isArray(parsedSuggestion.roomIds) ||
      !parsedSuggestion.slug
    ) {
      throw new Error("Parsed suggestion does not match the TopicFormData interface");
    }

    res.status(200).json(parsedSuggestion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error generating topic", error: error.message });
  }
}
