-- ============================================================
--  Krishna's Cafe — Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Ratings table: one row per dish
CREATE TABLE IF NOT EXISTS public.ratings (
  dish_id     TEXT        PRIMARY KEY,
  total       INTEGER     NOT NULL DEFAULT 0,
  count       INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update the updated_at column on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.ratings;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row-Level Security (RLS)
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read ratings (public menu)
CREATE POLICY "Allow public read"
  ON public.ratings FOR SELECT
  USING (true);

-- Allow anyone to insert/update ratings (anonymous users can rate)
CREATE POLICY "Allow public insert"
  ON public.ratings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON public.ratings FOR UPDATE
  USING (true);

-- Only allow delete via service role (admin only)
-- To reset all ratings, run: DELETE FROM public.ratings;
