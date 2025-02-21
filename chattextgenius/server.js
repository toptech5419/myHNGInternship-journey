import dotenv from "dotenv";
import express from "express";
import { HfInference } from "@huggingface/inference";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" })); 

const hf = new HfInference(process.env.HF_API_TOKEN);

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length < 50) {
      return res.status(400).json({ error: "Text too short for summarization" });
    }

    console.log("Received text for summarization:", text);
    const response = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: text,
      parameters: {
        max_length: 75, 
        min_length: 30,  
      },
    });

    // console.log("Hugging Face response:", response.summary_text);
    const summary = `Summarised answer:- ${response.summary_text}`;
    res.json({ summary });
  } catch (error) {
    // console.error("Summarization Error:", error.message, error.stack);
    res.status(500).json({ error: "Summarization failed", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));