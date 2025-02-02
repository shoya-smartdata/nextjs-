const express = require('express');
const CustomerRouter = express.Router();
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../../controllers/customerController/customerController');
const { protect, authorize } = require('../../middleware/protected');

CustomerRouter
  .route('/')
  .get(protect, getCustomers)
  .post(protect, createCustomer);

CustomerRouter
  .route('/:id')
  .get(protect, getCustomer)
  .put(protect, updateCustomer)
  .delete(protect, authorize('admin', 'manager'), deleteCustomer);

module.exports = CustomerRouter;