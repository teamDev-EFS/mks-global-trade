import { verifyToken } from '../utils/jwt.js';
import Admin from '../models/Admin.js';

export async function requireAuth(req, res, next) {
  try {
    const h = req.headers.authorization;
    if (!h?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = h.slice(7);
    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.sub).select('-passwordHash');
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Account inactive or not found' });
    }
    req.admin = admin;
    req.adminId = admin._id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin) return res.status(401).json({ error: 'Unauthorized' });
    if (roles.length && !roles.includes(req.admin.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
