import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates engaging debate topics. Create topics that are balanced, thought-provoking, and suitable for academic debate."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const suggestion = completion.data.choices[0].message?.content;
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating topic' });
  }
}