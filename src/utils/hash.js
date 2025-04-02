import crypto from 'crypto';
import { connectDB } from '../db.js';

export const getSalt = () => {
  return crypto.randomBytes(30).toString('base64url').substring(0, 10);
};

export const hashPassword = (text, salt) => {
  const newMsg = salt + text;
  const hashing = crypto.createHash('sha512');
  const hash = hashing.update(newMsg).digest('base64url');
  return hash;
};

export const postUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
  }
  const salt = getSalt();
  const hash = hashPassword(password, salt);
  const saltedHash = salt + hash;
  const sql = connectDB();
  const query = {
    text: `INSERT INTO users (name, password) VALUES ($1, $2)`,
    values: [username, saltedHash],
  };
  const data = await sql.query(query);
  res.json(data.rows);
};
