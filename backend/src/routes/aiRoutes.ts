import express from 'express';
import axios from 'axios';
import User from '../models/User.ts';

const router = express.Router();

// Define Gemini environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"; 

// Keep ElevenLabs variables
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;


// --- Helper: Prompt Construction ---
const constructPrompt = (name: string, gender: 'male' | 'female', genre: string): string => {
    const pronoun = gender === 'male' ? 'him' : 'her';
    const possessive = gender === 'male' ? 'his' : 'her';

    return `
        Write a short, catchy birthday song lyrics (max 8 lines) in the style of a ${genre} song for a person named ${name}. 
        The song should be celebratory and suitable for a commercial jingle, referencing ${possessive} birthday. 
        Do not include any introductions, explanations, or wrappers like "Chorus:". 
        Only return the raw lyrics.
    `.trim();
};


// --- ROUTE: Generate Lyrics (POST /api/ai/lyrics/generate) ---
router.post('/lyrics/generate', async (req, res) => {
  const { userId, receiverName, gender, genre } = req.body; 
  
  if (!GEMINI_API_KEY) {
      console.error("CONFIGURATION ERROR: Gemini API key is missing in .env");
      return res.status(500).json({ message: "Server configuration error: AI service key missing." });
  }

  try {
    const prompt = constructPrompt(receiverName, gender as 'male' | 'female', genre);
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await axios.post(
      geminiEndpoint, 
      {
        contents: [
            { role: "user", parts: [{ text: prompt }] }
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    const generatedLyrics = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() 
                            ?? "Happy Birthday to You! (Fallback from Gemini)"; 
    
    await User.findOneAndUpdate({ userId }, { lyrics: generatedLyrics }, { new: true });
    res.json({ lyrics: generatedLyrics });

  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : 'N/A';
    console.error(`Gemini API Error: Status ${status}. Full Error:`, error);
    
    let message = "Error connecting to AI service.";
    if (status === 401 || status === 403) {
        message = "Gemini key is invalid or unauthorized (403). Billing is required.";
    } 

    res.status(500).json({ 
        lyrics: "It's the greatest day! A technical error occurred.", 
        message: message 
    });
  }
});

// --- ROUTE: Text-to-Speech (POST /api/ai/tts) ---
router.post('/tts', async (req, res) => {
    if (!req.body.text) {
      return res.status(400).json({ message: "Missing text for TTS." });
    }
  
    if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
      console.error("CONFIGURATION ERROR: ElevenLabs key or voice ID is missing in .env");
      return res.status(500).json({ message: "TTS API keys not configured in backend." });
    }
  
    try {
      const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID!}/stream`;
      
      const ttsResponse = await axios.post(
        elevenLabsUrl,
        {
          text: req.body.text,
          model_id: "eleven_monolingual_v1", 
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        },
        {
          headers: {
            "Accept": "audio/mpeg",
            "xi-api-key": ELEVENLABS_API_KEY!, 
            "Content-Type": "application/json",
          },
          responseType: 'stream', 
        }
      );
  
      res.setHeader('Content-Type', 'audio/mpeg');
      ttsResponse.data.pipe(res);
  
    } catch (error) {
      console.error("ElevenLabs TTS Error:", error);
      res.status(500).json({ message: "TTS service failed. Check API key and voice ID." });
    }
  });


export default router;