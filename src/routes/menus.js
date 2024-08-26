import express from 'express';
import menuController from '../Controllers/menuController.js';

const router = express.Router();

router.get('/:restaurantId', menuController.getMenuByRestaurantId);
router.post('/', menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);


export default router;
