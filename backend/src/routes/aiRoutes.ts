import express from "express";
import axios from "axios";
import User from "../models/User.ts";

const router = express.Router();

router.post("/lyrics", async (req, res) => {
  const { userId, receiverName, gender, genre } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing");
    return res.status(500).json({ error: "OPENAI_API_KEY missing" });
  }

  if (!receiverName || !genre || !gender) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const subjectPronoun = gender === "Female" ? "her" : "him";
  const possessivePronoun = gender === "Female" ? "her" : "his";

  const prompt = `
Wish a happy birthday to ${receiverName}.

Ensure that "Happy birthday" is mentioned at least twice and rhymes.
Use simple, short, easy-to-pronounce words.

Write 16 lines of ${genre} lyrics that I can dedicate to ${subjectPronoun} for ${possessivePronoun} birthday.
Each line must have at most 8 words or 40 characters.

Lyrics must be completely original.
Avoid proper nouns except "${receiverName}".
Avoid offensive, political, religious, or abusive content.
  `.trim();

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        temperature: 0.9,
        messages: [
          { role: "system", content: "You are a professional birthday song lyricist." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const lyrics = response.data.choices[0].message.content.trim();

    if (userId) {
      await User.updateOne({ userId }, { lyrics });
    }

    res.json({ lyrics });

  } catch (error: any) {
    console.error("STATUS:", error.response?.status);
    console.error("OPENAI BODY:", error.response?.data);

    res.status(500).json({
      error: "AI generation failed"
    });
  }
});

export default router;
