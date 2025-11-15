const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Получить курсы валют
app.get('/api/rates', async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

// Serverless handler для Vercel (экспортируем app)
module.exports = app;