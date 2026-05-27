const windowStore = new Map();

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 100 } = {}) => (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const windowStart = now - windowMs;
  const entries = windowStore.get(key) || [];
  const recent = entries.filter((timestamp) => timestamp > windowStart);

  if (recent.length >= max) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  recent.push(now);
  windowStore.set(key, recent);
  next();
};

module.exports = rateLimit;
