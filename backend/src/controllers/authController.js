import Admin from '../models/Admin.js';
import { comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ok = await comparePassword(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    admin.lastLoginAt = new Date();
    await admin.save();
    const token = signToken({ sub: admin._id.toString(), role: admin.role });
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function me(req, res) {
  res.json({
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
}
