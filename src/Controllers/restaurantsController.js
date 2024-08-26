import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getAllRestaurants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to retrieve restaurants' });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM restaurants WHERE restaurantid = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to retrieve restaurant' });
  }
};

const createRestaurant = async (req, res) => {
  const { name, address, description, phone, email, website } = req.body;

  if (!name || !address || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO restaurants (name, address, description, phone, email, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, address, description, phone, email, website]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating restaurant:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};




const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, address, description, phone, email, website } = req.body;
  try {
    const result = await pool.query(
      'UPDATE restaurants SET name = $1, address = $2, description = $3, phone = $4, email = $5, website = $6 WHERE restaurantid = $7 RETURNING *',
      [name, address, description, phone, email, website, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM restaurants WHERE restaurantid = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
};

const restaurantsController = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
export default restaurantsController;
