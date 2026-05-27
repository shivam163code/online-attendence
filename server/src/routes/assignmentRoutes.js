const express = require('express');
const controller = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin', 'teacher', 'student'), controller.list);
router.post('/', authorize('admin', 'teacher'), controller.create);
router.patch('/:id', authorize('admin', 'teacher'), controller.update);
router.delete('/:id', authorize('admin', 'teacher'), controller.remove);

module.exports = router;
