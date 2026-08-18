-- Up A Tree LLC — initial schema
-- Apply locally:  npx wrangler d1 execute upatree-db --local  --file=./migrations/0001_init.sql
-- Apply remotely: npx wrangler d1 execute upatree-db --remote --file=./migrations/0001_init.sql

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  crew TEXT,
  status TEXT NOT NULL DEFAULT 'requested',
  notes TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_date ON jobs (date);

CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests (created_at);

-- Seed a few sample jobs so the schedule board isn't empty on first run.
-- Safe to delete these rows once you have real jobs.
INSERT OR IGNORE INTO jobs
  (id, customer_name, phone, address, service_type, date, time, crew, status, notes, created_at)
VALUES
  ('seed-1', 'Karen Whitfield', '(816) 555-0142', '4521 W 71st St, Prairie Village, KS', 'Tree Removal',
   date('now', '+1 day'), '8:00 AM', 'Crew A', 'scheduled',
   'Large silver maple, close to power line. Bring bucket truck.', datetime('now')),
  ('seed-2', 'Marcus Denny', '(913) 555-0198', '1180 NE Vivion Rd, Kansas City, MO', 'Trimming / Pruning',
   date('now', '+2 day'), '10:30 AM', 'Crew B', 'scheduled', NULL, datetime('now')),
  ('seed-3', 'Angela Ruiz', '(816) 555-0170', '902 W 39th St, Kansas City, MO', 'Stump Grinding',
   date('now', '+4 day'), '1:00 PM', 'Crew A', 'requested',
   'Two stumps in backyard, confirm gate access code.', datetime('now'));
