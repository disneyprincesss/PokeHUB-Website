import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file will be created in the server directory
const databaseFilePath = path.join(__dirname, 'pokehub.sqlite');
const db = new Database(databaseFilePath);

// Initialize schema
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS nicknames (
    pokemon_id INTEGER PRIMARY KEY,
    nickname TEXT NOT NULL
  );
`);

const getNicknameStmt = db.prepare('SELECT nickname FROM nicknames WHERE pokemon_id = ?');
const setNicknameStmt = db.prepare(`
  INSERT INTO nicknames (pokemon_id, nickname)
  VALUES (?, ?)
  ON CONFLICT(pokemon_id) DO UPDATE SET nickname = excluded.nickname
`);
const deleteNicknameStmt = db.prepare('DELETE FROM nicknames WHERE pokemon_id = ?');

export function getNickname(pokemonId) {
  const row = getNicknameStmt.get(pokemonId);
  return row ? row.nickname : null;
}

export function getNicknamesForIds(pokemonIds) {
  if (!Array.isArray(pokemonIds) || pokemonIds.length === 0) {
    return new Map();
  }
  const placeholders = pokemonIds.map(() => '?').join(',');
  const stmt = db.prepare(`SELECT pokemon_id, nickname FROM nicknames WHERE pokemon_id IN (${placeholders})`);
  const rows = stmt.all(...pokemonIds);
  const result = new Map();
  for (const row of rows) {
    result.set(row.pokemon_id, row.nickname);
  }
  return result;
}

export function setNickname(pokemonId, nickname) {
  setNicknameStmt.run(pokemonId, nickname);
}

export function deleteNickname(pokemonId) {
  deleteNicknameStmt.run(pokemonId);
}

export default db;



