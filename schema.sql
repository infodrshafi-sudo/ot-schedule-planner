CREATE TABLE IF NOT EXISTS surgeries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL DEFAULT '',
  surgery TEXT NOT NULL,
  department TEXT NOT NULL,
  surgeon TEXT NOT NULL,
  ana TEXT NOT NULL,
  patient TEXT NOT NULL DEFAULT '',
  mr TEXT NOT NULL DEFAULT '',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_surgeries_date_time ON surgeries(date, time);
