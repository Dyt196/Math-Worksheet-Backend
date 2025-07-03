// ES module syntax
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'data.db'));

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;