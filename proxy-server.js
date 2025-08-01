const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/provinces', async (req, res) => {
  try {
    const response = await axios.get('https://provinces.open-api.vn/api/p');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
});

app.get('/api/provinces/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${req.params.id}?depth=2`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch province details' });
  }
});

app.get('/api/districts/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://provinces.open-api.vn/api/d/${req.params.id}?depth=2`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch district details' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 