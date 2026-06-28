// ============================================================
//  Krishna's Cafe — Ratings Backend
//  Stack : Node.js · Express · Supabase (PostgreSQL)
//  Deploy: Render  →  https://render.com
// ============================================================

require('dotenv').config(); // loads .env on local dev (ignored on Render)
const express  = require('express');
const cors     = require('cors');
const ws       = require('ws');
global.WebSocket = ws; // Set global WebSocket constructor for older Node.js versions
const { createClient } = require('@supabase/supabase-js');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Supabase client ────────────────────────────────────────
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Middleware ─────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',   // set FRONTEND_URL on Render for security
}));
app.use(express.json());

// ── Health check ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: "Krishna's Cafe Ratings API is running 🚀" });
});

// ── Helpers ────────────────────────────────────────────────
function computeAverage(total, count) {
  if (!count) return 0;
  return parseFloat((total / count).toFixed(1));
}

// ── Routes ─────────────────────────────────────────────────

/**
 * GET /api/ratings
 * Returns all dish ratings with computed averages.
 */
app.get('/api/ratings', async (req, res) => {
  const { data, error } = await supabase
    .from('ratings')
    .select('dish_id, total, count');

  if (error) {
    console.error('GET /api/ratings error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  const result = {};
  (data || []).forEach(row => {
    result[row.dish_id] = {
      total:   row.total,
      count:   row.count,
      average: computeAverage(row.total, row.count),
    };
  });

  res.json(result);
});

/**
 * GET /api/ratings/:dishId
 * Returns the rating summary for a single dish.
 */
app.get('/api/ratings/:dishId', async (req, res) => {
  const { dishId } = req.params;

  const { data, error } = await supabase
    .from('ratings')
    .select('dish_id, total, count')
    .eq('dish_id', dishId)
    .maybeSingle();

  if (error) {
    console.error(`GET /api/ratings/${dishId} error:`, error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.json({ dishId, total: 0, count: 0, average: 0 });
  }

  res.json({
    dishId,
    total:   data.total,
    count:   data.count,
    average: computeAverage(data.total, data.count),
  });
});

/**
 * POST /api/ratings/:dishId
 * Submit a star rating (1–5) for a dish.
 * Body: { stars: number }
 */
app.post('/api/ratings/:dishId', async (req, res) => {
  const { dishId } = req.params;
  const value = parseInt(req.body?.stars, 10);

  if (isNaN(value) || value < 1 || value > 5) {
    return res.status(400).json({ error: '"stars" must be an integer between 1 and 5.' });
  }

  // Fetch existing row
  const { data: existing, error: fetchError } = await supabase
    .from('ratings')
    .select('total, count')
    .eq('dish_id', dishId)
    .maybeSingle();

  if (fetchError) {
    console.error('Fetch error:', fetchError.message);
    return res.status(500).json({ error: fetchError.message });
  }

  let newTotal, newCount, dbError;

  if (existing) {
    newTotal = existing.total + value;
    newCount = existing.count + 1;

    const { error } = await supabase
      .from('ratings')
      .update({ total: newTotal, count: newCount, updated_at: new Date().toISOString() })
      .eq('dish_id', dishId);
    dbError = error;
  } else {
    newTotal = value;
    newCount = 1;

    const { error } = await supabase
      .from('ratings')
      .insert({ dish_id: dishId, total: newTotal, count: newCount });
    dbError = error;
  }

  if (dbError) {
    console.error('Upsert error:', dbError.message);
    return res.status(500).json({ error: dbError.message });
  }

  const average = computeAverage(newTotal, newCount);
  console.log(`⭐ ${dishId} → ${value} stars | avg: ${average} (${newCount} ratings)`);

  res.status(201).json({
    dishId,
    total:   newTotal,
    count:   newCount,
    average,
    message: `Rating of ${value} star${value > 1 ? 's' : ''} submitted successfully.`,
  });
});

/**
 * DELETE /api/ratings/:dishId
 * Resets ratings for a specific dish (admin utility).
 */
app.delete('/api/ratings/:dishId', async (req, res) => {
  const { dishId } = req.params;

  const { error } = await supabase
    .from('ratings')
    .delete()
    .eq('dish_id', dishId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  console.log(`🗑️  Ratings deleted for: "${dishId}"`);
  res.json({ message: `Ratings for "${dishId}" have been reset.` });
});

// ── 404 catch-all ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Krishna's Cafe Ratings API running on http://localhost:${PORT}`);
  console.log(`   Connected to Supabase: ${process.env.SUPABASE_URL}\n`);
});
