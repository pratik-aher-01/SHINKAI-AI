import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

// Enable CORS for all origins (frontend on Vercel can access)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test route to check backend
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// POST /chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userMessage);

    res.json({ reply: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use Render port or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
