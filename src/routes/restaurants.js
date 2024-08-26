import express from 'express';
import restaurantsController from '../Controllers/restaurantsController.js';

const router = express.Router();

router.get('/', restaurantsController.getAllRestaurants);
router.get('/:id', restaurantsController.getRestaurantById);
router.post('/', restaurantsController.createRestaurant);
router.put('/:id', restaurantsController.updateRestaurant);
router.delete('/:id', restaurantsController.deleteRestaurant);

export default router;
