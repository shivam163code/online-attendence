const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn, secret) => jwt.sign(payload, secret, { expiresIn });

module.exports = { generateToken };
