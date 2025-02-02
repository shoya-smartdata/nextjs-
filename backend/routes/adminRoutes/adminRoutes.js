const express = require('express');
const adminRouter = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getStats
} = require('../../controllers/adminController/adminController');
const { protect, authorize } = require('../../middleware/protected');

// All routes protected and require admin role
adminRouter.use(protect);
adminRouter.use(authorize('admin'));

adminRouter.route('/users')
  .get(getUsers)
  .post(createUser);

  adminRouter.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

  adminRouter.route('/stats')
  .get(getStats);

module.exports = adminRouter;