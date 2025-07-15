const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

// Allow frontend to fetch from same server
app.use(cors());

// Serve static files (e.g., index.html, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Handle image upload and analysis
app.post('/api/analyze', upload.single('image'), (req, res) => {
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

// Fallback: send index.html on unknown routes (for browser refresh support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
