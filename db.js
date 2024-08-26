import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Database connection error', err);
});

export default pool;

(async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully acquired a client');
    client.release();
  } catch (err) {
    console.error('Error acquiring client', err);
  }
})();
