const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // Set this in your Render environment variables
});

app.use(cors());
app.use(express.static(__dirname));

app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const base64Image = req.file.buffer.toString('base64');

    // Prepare ChatGPT prompt
    const prompt = `
You are an expert in iridology. A user has uploaded a photo of their iris. Based on this image (assume it's clear and centered), provide a personalized iridology analysis report including:
- Dominant iris pattern
- Possible health insight
- Confidence level (as a %)
- Dietary tip
- Lifestyle suggestion
- Additional insights
- Recommendations

Keep it concise, factual, and unique.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an iridologist analyzing iris images.',
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      temperature: 0.8
    });

    const reply = response.choices[0].message.content;

    res.json({ analysis: reply });

  } catch (err) {
    console.error('❌ Error analyzing with ChatGPT:', err);
    res.status(500).json({ error: 'Failed to analyze iris' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ API Server is running on port ${PORT}`);
});
