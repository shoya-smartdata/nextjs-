const Customer = require('../../models/CustomerModel/customerModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
exports.getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ createdBy: req.user.id })
    .sort('-createdAt')
    .populate('createdBy', 'name email');

  res.status(200).json({
    success: true,
    count: customers.length,
    data: customers
  });
});

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
exports.getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)
    .populate('createdBy', 'name email');

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: 'Customer not found'
    });
  }

  // Check user ownership
  if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this customer'
    });
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Create customer
// @route   POST /api/customers
// @access  Private
exports.createCustomer = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  
  const customer = await Customer.create(req.body);

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
exports.updateCustomer = asyncHandler(async (req, res) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: 'Customer not found'
    });
  }

  // Check user ownership
  if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to update this customer'
    });
  }

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private (Admin/Manager)
exports.deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: 'Customer not found'
    });
  }

  // Only admin/managers can delete
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to delete customers'
    });
  }

  await customer.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});