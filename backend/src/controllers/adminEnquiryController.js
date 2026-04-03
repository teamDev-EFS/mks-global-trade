import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import { createNoteNotification, createStatusUpdateNotification } from '../services/notificationService.js';

function buildFilter(query) {
  const f = {};
  if (query.search?.trim()) {
    const s = query.search.trim();
    const esc = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    f.$or = [
      { customerName: new RegExp(esc, 'i') },
      { phone: new RegExp(esc, 'i') },
      { enquiryId: new RegExp(esc, 'i') },
      { email: new RegExp(esc, 'i') },
      { 'products.productName': new RegExp(esc, 'i') },
    ];
  }
  if (query.country?.trim()) f.country = new RegExp(`^${query.country.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  if (query.status?.trim()) f.status = query.status;
  if (query.sourceType?.trim()) f.sourceType = query.sourceType;
  if (query.priority?.trim()) f.priority = query.priority;
  if (query.product?.trim()) {
    f['products.productName'] = new RegExp(query.product.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }
  if (query.dateFrom || query.dateTo) {
    f.createdAt = {};
    if (query.dateFrom) f.createdAt.$gte = new Date(query.dateFrom);
    if (query.dateTo) f.createdAt.$lte = new Date(query.dateTo);
  }
  return f;
}

export async function listEnquiries(req, res, next) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const filter = buildFilter(req.query);
    const sortField = req.query.sortBy === 'oldest' ? 1 : -1;
    const sort = { createdAt: sortField };

    const [items, total] = await Promise.all([
      Enquiry.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('assignedTo', 'name email')
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (e) {
    next(e);
  }
}

export async function getEnquiry(req, res, next) {
  try {
    const e = await Enquiry.findById(req.params.id).populate('assignedTo', 'name email').lean();
    if (!e) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(e);
  } catch (e) {
    next(e);
  }
}

export async function patchEnquiry(req, res, next) {
  try {
    const e = await Enquiry.findById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Enquiry not found' });
    const { status, priority, tags, assignedTo, notificationRead, isUnread } = req.body || {};
    if (status !== undefined && status !== e.status) {
      const old = e.status;
      e.status = status;
      e.timeline.push({
        type: 'status_change',
        description: `Status ${old} → ${status}`,
        adminId: req.adminId,
        adminName: req.admin.name,
        meta: { from: old, to: status },
      });
      await createStatusUpdateNotification(e, old, req.admin.name);
    }
    if (priority !== undefined && priority !== e.priority) {
      e.priority = priority;
      e.timeline.push({
        type: 'priority_change',
        description: `Priority set to ${priority}`,
        adminId: req.adminId,
        adminName: req.admin.name,
      });
    }
    if (Array.isArray(tags)) e.tags = tags;
    if (assignedTo !== undefined) {
      if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).json({ error: 'Invalid assignedTo ID' });
      }
      e.assignedTo = assignedTo ? new mongoose.Types.ObjectId(assignedTo) : null;
      if (assignedTo) {
        e.timeline.push({
          type: 'assigned',
          description: 'Lead assignment updated',
          adminId: req.adminId,
          adminName: req.admin.name,
        });
      }
    }
    if (typeof notificationRead === 'boolean') e.notificationRead = notificationRead;
    if (typeof isUnread === 'boolean') e.isUnread = isUnread;
    await e.save();
    const fresh = await Enquiry.findById(e._id).populate('assignedTo', 'name email').lean();
    res.json(fresh);
  } catch (e) {
    next(e);
  }
}

export async function addNote(req, res, next) {
  try {
    const { text } = req.body || {};
    if (!text?.trim()) return res.status(400).json({ error: 'Note text required' });
    const e = await Enquiry.findById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Enquiry not found' });
    e.adminNotes.push({
      text: text.trim(),
      adminId: req.adminId,
      adminName: req.admin.name,
    });
    e.timeline.push({
      type: 'note_added',
      description: text.trim().slice(0, 200),
      adminId: req.adminId,
      adminName: req.admin.name,
    });
    await e.save();
    await createNoteNotification(e, req.admin.name);
    const fresh = await Enquiry.findById(e._id).populate('assignedTo', 'name email').lean();
    res.json(fresh);
  } catch (e) {
    next(e);
  }
}

export async function markWhatsAppContacted(req, res, next) {
  try {
    const e = await Enquiry.findById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Enquiry not found' });
    e.contactedViaWhatsApp = true;
    e.contactedAt = new Date();
    e.status = e.status === 'new' ? 'contacted' : e.status;
    e.timeline.push({
      type: 'whatsapp',
      description: 'Contacted lead via WhatsApp',
      adminId: req.adminId,
      adminName: req.admin.name,
    });
    await e.save();
    const fresh = await Enquiry.findById(e._id).populate('assignedTo', 'name email').lean();
    res.json(fresh);
  } catch (e) {
    next(e);
  }
}

export async function statsOverview(req, res, next) {
  try {
    const [total, byStatus] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);
    const statusMap = Object.fromEntries(byStatus.map((x) => [x._id, x.count]));
    res.json({
      total,
      byStatus: statusMap,
      new: statusMap.new || 0,
      contacted: statusMap.contacted || 0,
      quoted: statusMap.quoted || 0,
      won: statusMap.won || 0,
      lost: statusMap.lost || 0,
    });
  } catch (e) {
    next(e);
  }
}

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function exportCsv(req, res, next) {
  try {
    const filter = buildFilter(req.query);
    const rows = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(5000).lean();
    const header = [
      'enquiryId',
      'customerName',
      'email',
      'phone',
      'country',
      'sourceType',
      'status',
      'priority',
      'products',
      'createdAt',
    ];
    const lines = [header.join(',')];
    for (const r of rows) {
      const productSummary = (r.products || [])
        .map((p) => p.productName || p.category)
        .filter(Boolean)
        .join('; ');
      lines.push(
        [
          csvEscape(r.enquiryId),
          csvEscape(r.customerName),
          csvEscape(r.email),
          csvEscape(r.phone),
          csvEscape(r.country),
          csvEscape(r.sourceType),
          csvEscape(r.status),
          csvEscape(r.priority),
          csvEscape(productSummary),
          csvEscape(r.createdAt?.toISOString()),
        ].join(',')
      );
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="enquiries.csv"');
    res.send(lines.join('\n'));
  } catch (e) {
    next(e);
  }
}
