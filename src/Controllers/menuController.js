import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getMenuByRestaurantId = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM menus WHERE restaurantid = $1', [restaurantId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve menu' });
  }
};


const createMenuItem = async (req, res) => {
  const { restaurantId, itemname, itemdescription, itemprice } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menus (restaurantid, itemname, itemdescription, itemprice) VALUES ($1, $2, $3, $4) RETURNING *',
      [restaurantId, itemname, itemdescription, itemprice]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating menu item:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to create menu item', details: err.message });
  }
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { itemname, itemdescription, itemprice } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menus SET itemname = $1, itemdescription = $2, itemprice = $3 WHERE menuid = $4 RETURNING *',
      [itemname, itemdescription, itemprice, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating menu item:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to update menu item', details: err.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM menus WHERE menuid = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting menu item:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to delete menu item', details: err.message });
  }
};

const menuController = {
  getMenuByRestaurantId,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};

export default menuController;
