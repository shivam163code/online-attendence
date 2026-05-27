const createNotificationPayload = ({ userId, title, message, type = 'info' }) => ({
  userId,
  title,
  message,
  type,
  isRead: false,
  createdAt: new Date()
});

module.exports = { createNotificationPayload };
