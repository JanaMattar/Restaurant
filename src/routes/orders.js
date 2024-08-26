import express from 'express';
import orderController from '../Controllers/orderController.js'; 

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/:userId', orderController.getOrdersByUserId);
router.put('/:id', orderController.updateOrderStatus);

export default router;
