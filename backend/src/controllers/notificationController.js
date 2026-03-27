import Notification from '../models/Notification.js';

export async function listNotifications(req, res, next) {
  try {
    const unreadOnly = req.query.filter === 'unread';
    const filter = unreadOnly ? { isRead: false } : {};
    const items = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .populate('enquiryId', 'enquiryId customerName country products status')
      .lean();
    res.json({ items });
  } catch (e) {
    next(e);
  }
}

export async function unreadCount(req, res, next) {
  try {
    const count = await Notification.countDocuments({ isRead: false });
    res.json({ count });
  } catch (e) {
    next(e);
  }
}

export async function markRead(req, res, next) {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!n) return res.status(404).json({ error: 'Not found' });
    res.json(n);
  } catch (e) {
    next(e);
  }
}

export async function markAllRead(req, res, next) {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}
