const Lead = require('../../models/LeadsModel/Leads');
const asyncHandler = require('express-async-handler');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = asyncHandler(async (req, res) => {
  let query;
  
  // Regular users can only see their assigned leads
  if (req.user.role === 'sales') {
    query = Lead.find({ assignedTo: req.user.id });
  } else {
    query = Lead.find();
  }

  const leads = await query
    .sort('-createdAt')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  res.status(200).json({
    success: true,
    count: leads.length,
    data: leads
  });
});

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
exports.getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  // Check access
  if (lead.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this lead'
    });
  }

  res.status(200).json({
    success: true,
    data: lead
  });
});

// @desc    Create lead
// @route   POST /api/leads
// @access  Private
exports.createLead = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  
  // Validate assignedTo exists
  const assignedUser = await User.findById(req.body.assignedTo);
  if (!assignedUser) {
    return res.status(400).json({
      success: false,
      error: 'Assigned user not found'
    });
  }

  const lead = await Lead.create(req.body);

  res.status(201).json({
    success: true,
    data: lead
  });
});

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = asyncHandler(async (req, res) => {
  let lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  // Check permissions
  if (lead.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to update this lead'
    });
  }

  lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: lead
  });
});

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin/Manager)
exports.deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  // Only admin/managers can delete
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to delete leads'
    });
  }

  await lead.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});