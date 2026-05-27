const asyncHandler = require('../utils/asyncHandler');
const { getDashboardStats } = require('../services/analyticsService');

const dashboardStats = asyncHandler(async (req, res) => {
  const data = await getDashboardStats();
  res.status(200).json({ data });
});

module.exports = { dashboardStats };
