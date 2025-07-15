const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

app.post('/api/analyze', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      console.log('❌ No image file received.');
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('✅ Image received:', req.file.originalname);

    res.json({
      pattern: 'Lacuna',
      insight: 'Possible digestive issues',
      confidence: 85,
      dietaryTip: 'Drink more water',
      lifestyle: 'Practice mindfulness',
      additionalInsights: 'Eye shows signs of stress',
      recommendations: 'Avoid processed food'
    });
  } catch (err) {
    console.error('❌ Analysis failed:', err);
    res.status(500).json({ error: 'Analysis error' });
  }
});

// Fallback to index.html for all GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
