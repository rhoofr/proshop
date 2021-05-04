// import path from 'path';
// import ErrorResponse from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';
import Product from '../models/productModel.js';

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, products });
});

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');

    // return next(
    //   new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    // );
  }

  res.status(200).json({ success: true, product });
});
