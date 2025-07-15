// backend/index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post('/api/analyze', upload.single('image'), (req, res) => {
  // Simulated fake analysis logic
  res.json({
    pattern: 'Lacuna',
    insight: 'Possible digestive issues',
    confidence: 85,
    dietaryTip: 'Drink more water',
    lifestyle: 'Practice mindfulness',
    additionalInsights: 'Eye shows signs of stress',
    recommendations: 'Avoid processed food'
  });
});

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
