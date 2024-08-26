import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const createOrder = async (req, res) => {
  console.log('Request body:', req.body); 
  const { userId, items, totalPrice, status } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items array is required and cannot be empty' });
  }

  const itemsJson = JSON.stringify(items);
  try {
    const result = await pool.query(
      'INSERT INTO orders (userid, items, totalprice, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, itemsJson, totalPrice, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating order:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
};


const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE userid = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE orderid = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

const orderController = {
  createOrder,
  getOrdersByUserId,
  updateOrderStatus,
};
export default orderController;
