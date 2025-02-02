const User = require('../../models/UserModel/userModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user (admin only)
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: 'User already exists'
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    }
  });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Prevent deleting self
  if (user._id.toString() === req.user.id) {
    return res.status(400).json({
      success: false,
      error: 'You cannot delete yourself'
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const customersCount = await Customer.countDocuments();
  const leadsCount = await Lead.countDocuments();
  const interactionsCount = await Interaction.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      users: usersCount,
      customers: customersCount,
      leads: leadsCount,
      interactions: interactionsCount
    }
  });
});