// server.js
import dotenv from "dotenv";
import express from "express";
import { HfInference } from "@huggingface/inference";
import textSummarizerly from "text-summarizerly"; // Default import for CommonJS module
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// Dynamic CORS for local & production
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? "https://chattextgen.vercel.app"
    : "http://localhost:8080";

app.use(cors({ origin: allowedOrigins }));

const hf = new HfInference(process.env.HF_API_TOKEN);

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length < 50) {
      return res.status(400).json({ error: "Text too short for summarization" });
    }

    console.log("Received text for summarization:", text);

    // Try Hugging Face first
    try {
      const hfResponse = await hf.summarization({
        model: "facebook/bart-large-cnn",
        inputs: text,
        parameters: {
          max_length: 100,
          min_length: 30,
        },
      });
      const summary = `summarised answer:- ${hfResponse.summary_text}`;
      console.log("Hugging Face response:", hfResponse.summary_text);
      return res.json({ summary });
    } catch (hfError) {
      console.error("Hugging Face Error:", hfError.message);

      // Fallback to text-summarizerly
      try {
        const backupSummary = await textSummarizerly.summarize(text, { sentences: 2 }); // Use default import
        const summary = `summarised answer:- ${backupSummary}`;
        console.log("Backup (text-summarizerly) response:", backupSummary);
        return res.json({ summary });
      } catch (backupError) {
        console.error("Backup Summarizer Error:", backupError.message);
        throw new Error("Both summarization methods failed");
      }
    }
  } catch (error) {
    console.error("Summarization Error:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Summarization failed", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));