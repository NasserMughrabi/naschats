import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import runMiddleware from "../../../lib/runMiddleware";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// eslint-disable-next-line new-cap
const cors = Cors({
  methods: ["POST"]
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { method, body } = req;
  const { prompt } = body;

  switch (method) {
    case "POST":
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              messages: [{ role: "user", content: prompt }],
              temperature: 0.4,
              max_tokens: 120,
              n: 1,
              model: "gpt-4",
              frequency_penalty: 0.5,
              presence_penalty: 0.5
            })
          }
        );

        const result = await response.json();
        const text = result.choices[0].message.content.trim();

        res.status(200).json({ loading: false, response: text });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          loading: false,
          response: "Failed to get response from OpenAI ⚠️"
        });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
