import express from 'express';

import { getProducts, getProduct } from '../controllers/productController.js';

// const Product = require('../models/Product.js');

const router = express.Router();

// const advancedResults = require('../middleware/advancedResults');
// const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getProducts);
// .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id').get(getProduct);
// .put(protect, authorize('publisher', 'admin'), updateBootcamp)
// .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

export default router;
