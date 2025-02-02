const express = require('express');
const leadRoute = express.Router();
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead
} = require('../../controllers/leadController/leadController');
const { protect, authorize } = require('../../middleware/protected');

leadRoute
  .route('/')
  .get(protect, getLeads)
  .post(protect, createLead);

leadRoute
  .route('/:id')
  .get(protect, getLead)
  .put(protect, updateLead)
  .delete(protect, authorize('admin', 'manager'), deleteLead);

module.exports = leadRoute;