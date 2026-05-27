const express = require('express');
const { register, login, forgotPassword, me } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validate = require('../validators/commonValidator');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, me);

module.exports = router;
