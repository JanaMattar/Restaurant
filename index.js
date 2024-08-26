import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import './db.js';  

import restaurantRoutes from './src/routes/restaurants.js';
import menuRoutes from './src/routes/menus.js';
import orderRoutes from './src/routes/orders.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Jana Mattar!');
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Example in Express.js
app.put('/api/user/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    // Validate and sanitize input
    
    // Update user profile in the database
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});
// Example in Express.js
app.put('/api/user/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    // Validate and sanitize input
    
    // Update user profile in the database
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
