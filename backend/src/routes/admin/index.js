import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { adminLoginLimiter } from '../../middleware/loginRateLimiter.js';
import * as auth from '../../controllers/authController.js';
import * as enquiries from '../../controllers/adminEnquiryController.js';
import * as notifications from '../../controllers/notificationController.js';
import * as analytics from '../../controllers/analyticsController.js';

const router = Router();

router.post('/auth/login', adminLoginLimiter, auth.login);
router.get('/auth/me', requireAuth, auth.me);

router.get('/enquiries/stats/overview', requireAuth, enquiries.statsOverview);
router.get('/enquiries/export/csv', requireAuth, enquiries.exportCsv);
router.get('/enquiries', requireAuth, enquiries.listEnquiries);
router.get('/enquiries/:id', requireAuth, enquiries.getEnquiry);
router.patch('/enquiries/:id', requireAuth, enquiries.patchEnquiry);
router.post('/enquiries/:id/notes', requireAuth, enquiries.addNote);
router.post('/enquiries/:id/whatsapp-contacted', requireAuth, enquiries.markWhatsAppContacted);

router.get('/notifications', requireAuth, notifications.listNotifications);
router.get('/notifications/unread-count', requireAuth, notifications.unreadCount);
router.patch('/notifications/:id/read', requireAuth, notifications.markRead);
router.patch('/notifications/read-all', requireAuth, notifications.markAllRead);

router.get('/analytics/dashboard', requireAuth, analytics.dashboard);
router.get('/analytics/countries', requireAuth, analytics.countriesReport);
router.get('/analytics/products', requireAuth, analytics.productsReport);
router.get('/analytics/trends', requireAuth, analytics.trends);

export default router;
