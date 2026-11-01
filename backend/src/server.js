const express = require('express');
const cors = require('cors');
const { SECTIONS, CAFE_SETTINGS, MENU_ITEMS, PLAYLIST } = require('./data/mockData');
const { searchSongs, getSongDetails } = require('./services/jiosaavnService');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory data store with initial data
let menuData = [...MENU_ITEMS];
let playlistData = [...PLAYLIST];
let ratingsData = [];

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 0. Root Status
app.get('/', (req, res) => {
  res.json({
    name: 'Velvet Bean Cafe & Waffleria Backend API',
    status: 'online',
    endpoints: {
      health: '/api/health',
      menu: '/api/menu',
      sections: '/api/sections',
      settings: '/api/settings',
      musicSearch: '/api/music/search?q=laufey'
    }
  });
});

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Velvet Bean Cafe & Waffleria Backend API is operational',
    timestamp: new Date().toISOString()
  });
});

// 2. Sections
app.get('/api/sections', (req, res) => {
  res.json({
    success: true,
    data: SECTIONS
  });
});

// 3. Cafe Settings & UPI
app.get('/api/settings', (req, res) => {
  res.json({
    success: true,
    data: CAFE_SETTINGS
  });
});

// 4. Menu Items with filtering
app.get('/api/menu', (req, res) => {
  const { section, category, vegOnly } = req.query;
  let results = [...menuData];

  if (section) {
    results = results.filter((i) => i.sectionId === section);
  }
  if (category && category !== 'All') {
    results = results.filter((i) => i.category === category);
  }
  if (vegOnly === 'true') {
    results = results.filter((i) => i.isVeg);
  }

  res.json({
    success: true,
    total: results.length,
    data: results
  });
});

// 5. Excel / Batch Menu Import
app.post('/api/menu/import', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'Items array is required' });
  }

  menuData = items;
  res.json({
    success: true,
    message: `Successfully updated ${items.length} menu items`,
    total: menuData.length
  });
});

// 6. Lounge Playlist
app.get('/api/playlist', (req, res) => {
  res.json({
    success: true,
    total: playlistData.length,
    data: playlistData
  });
});

// 7. Update Lounge Playlist
app.post('/api/playlist', (req, res) => {
  const { playlist } = req.body;
  if (!Array.isArray(playlist)) {
    return res.status(400).json({ success: false, message: 'Playlist array is required' });
  }

  playlistData = playlist;
  res.json({
    success: true,
    message: 'Lounge playlist updated successfully',
    data: playlistData
  });
});

// 7b. JioSaavn Music Search API (jiosaavn-api integration)
app.get('/api/music/search', async (req, res) => {
  const { q, limit } = req.query;
  if (!q) {
    return res.status(400).json({ success: false, message: 'Query parameter q is required' });
  }

  const results = await searchSongs(q, Number(limit) || 10);
  res.json({
    success: true,
    query: q,
    total: results.length,
    data: results
  });
});

// 7c. JioSaavn Song Details & Stream URL
app.get('/api/music/song/:id', async (req, res) => {
  const song = await getSongDetails(req.params.id);
  if (!song) {
    return res.status(404).json({ success: false, message: 'Song not found' });
  }
  res.json({
    success: true,
    data: song
  });
});

// 8. Dish Ratings & Reviews
app.post('/api/ratings', (req, res) => {
  const { itemId, rating, review } = req.body;
  if (!itemId || !rating) {
    return res.status(400).json({ success: false, message: 'ItemId and rating are required' });
  }

  const newRating = {
    id: `r_${Date.now()}`,
    itemId,
    rating: Number(rating),
    review: review || '',
    createdAt: new Date().toISOString()
  };

  ratingsData.push(newRating);

  // Update item average rating in memory
  const item = menuData.find((i) => i.id === itemId);
  if (item) {
    const itemRatings = ratingsData.filter((r) => r.itemId === itemId);
    const sum = itemRatings.reduce((acc, curr) => acc + curr.rating, 0);
    item.rating = Number((sum / itemRatings.length).toFixed(1));
    item.ratingCount = itemRatings.length;
  }

  res.json({
    success: true,
    message: 'Rating recorded successfully',
    data: newRating
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`☕ Cafe Backend API running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Menu Endpoints: http://localhost:${PORT}/api/menu`);
  console.log(`🎵 Playlist Endpoints: http://localhost:${PORT}/api/playlist`);
});
