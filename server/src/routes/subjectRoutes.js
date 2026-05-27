const express = require('express');
const controller = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin', 'teacher'), controller.list);
router.post('/', authorize('admin'), controller.create);
router.patch('/:id', authorize('admin'), controller.update);
router.delete('/:id', authorize('admin'), controller.remove);

module.exports = router;
