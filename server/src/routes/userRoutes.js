const express = require('express');
const { listUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/', listUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
