import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Tutor endpoint with Google Search Grounding
app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const systemInstruction = `You are Farhan, an expert NEET Chemistry Master and NCERT inorganic chemistry tutor. Provide precise, engaging, highly structured, NEET-focused explanations with memory tips, NCERT chapter references, and caution against common traps. Keep explanations professional, clear, and scientifically rigorous. Use search grounding when needed for up-to-date facts.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    res.json({ 
      answer: response.text || "I couldn't generate an answer right now. Please try again.",
      sources: searchChunks || []
    });
  } catch (error: any) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with AI tutor" });
  }
});

// Music Generation endpoint using Lyria
app.post("/api/generate-music", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "lyria-3-clip-preview",
      contents: prompt || "Calming study lofi beat for chemistry learning",
    });
    res.json({ audioUrl: response.text || "" });
  } catch (error: any) {
    console.error("Music Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate music" });
  }
});

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

