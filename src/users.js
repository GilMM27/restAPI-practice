import { connectDB } from './db.js';

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
  const result = await client.query(
    'INSERT INTO users (name, password) VALUES ($1, $2)',
    [req.body.name, req.body.password],
  );
  res.json(result.rows);
};
