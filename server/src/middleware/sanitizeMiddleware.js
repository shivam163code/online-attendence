const sanitizeInput = (req, res, next) => {
  const walk = (value) => {
    if (typeof value === 'string') {
      return value.replace(/<[^>]*>/g, '').trim();
    }
    if (Array.isArray(value)) {
      return value.map(walk);
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).reduce((acc, key) => {
        acc[key] = walk(value[key]);
        return acc;
      }, {});
    }
    return value;
  };

  if (req.body) req.body = walk(req.body);
  if (req.query) req.query = walk(req.query);
  next();
};

module.exports = sanitizeInput;
