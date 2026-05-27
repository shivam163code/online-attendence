const asyncHandler = require('../utils/asyncHandler');
const Notification = require('../models/Notification');
const { sendEmail } = require('../services/emailService');
const userRepository = require('../repositories/userRepository');

const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ data: notifications });
});

const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) return res.status(404).json({ message: 'Notification not found' });
  res.status(200).json({ message: 'Notification updated', data: notification });
});

const createNotification = asyncHandler(async (req, res) => {
  const payload = {
    userId: req.body.userId,
    title: req.body.title,
    message: req.body.message,
    type: req.body.type || 'info'
  };

  const notification = await Notification.create(payload);

  if (req.body.email) {
    const targetUser = await userRepository.findById(req.body.userId);
    await sendEmail({
      to: req.body.email || targetUser?.email,
      subject: payload.title,
      text: payload.message,
      html: `<p>${payload.message}</p>`
    });
  }

  res.status(201).json({ message: 'Notification created', data: notification });
});

module.exports = { listNotifications, markRead, createNotification };
