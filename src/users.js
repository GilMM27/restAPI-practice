import { connectDB } from './db.js';
import { hashPassword } from './utils/hash.js';

const client = connectDB();

export const getUsers = async (req, res) => {
  const result = await client.query('SELECT * FROM users');
  res.json(result.rows);
};

export const getUserById = async (req, res) => {
  const result = await client.query('SELECT * FROM users WHERE id = $1', [
    req.params.id,
  ]);
  res.json(result.rows);
};

export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body; // Use req.query instead of req.params

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const result = await client.query(
      'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
      [name, password],
    );

    res.status(201).json(result.rows[0]); // Return the created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginApi = async (req, res) => {
  const { username, password } = req.body;
  const query = {
    text: 'SELECT * FROM users WHERE name = $1',
    values: [username],
  };
  const data = await client.query(query);
  if (data.rows.length === 0) {
    return res.status(401).json({ isLogin: false, user: {} });
  }
  const salt = data.rows[0].password.substring(0, process.env.SALT);
  const hash = hashPassword(password, salt);
  const saltedHash = salt + hash;
  console.log('Salted Hash:', saltedHash);
  if (saltedHash === data.rows[0].password) {
    return res.status(200).json({ isLogin: true, user: data.rows[0] });
  }
  return res.status(401).json({ isLogin: false, user: {} });
};
