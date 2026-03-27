import Enquiry from '../models/Enquiry.js';

export async function dashboard(req, res, next) {
  try {
    const [
      total,
      statusAgg,
      countryAgg,
      sourceAgg,
      productAgg,
      last30,
      recentEnquiries,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Enquiry.aggregate([
        { $match: { country: { $nin: ['', null] } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 },
      ]),
      Enquiry.aggregate([
        { $group: { _id: '$sourceType', count: { $sum: 1 } } },
      ]),
      Enquiry.aggregate([
        { $unwind: { path: '$products', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$products.productName',
            count: { $sum: 1 },
          },
        },
        { $match: { _id: { $nin: ['', null] } } },
        { $sort: { count: -1 } },
        { $limit: 12 },
      ]),
      trendBuckets(),
      Enquiry.find().sort({ createdAt: -1 }).limit(8).select('enquiryId customerName country status createdAt products sourceType').lean(),
    ]);

    const byStatus = Object.fromEntries(statusAgg.map((x) => [x._id, x.count]));
    const activity = await recentActivity();

    res.json({
      kpis: {
        total,
        new: byStatus.new || 0,
        contacted: byStatus.contacted || 0,
        quoted: byStatus.quoted || 0,
        won: byStatus.won || 0,
        lost: byStatus.lost || 0,
        in_progress: byStatus.in_progress || 0,
        archived: byStatus.archived || 0,
      },
      byCountry: countryAgg.map((x) => ({ country: x._id, count: x.count })),
      bySource: sourceAgg.map((x) => ({ source: x._id, count: x.count })),
      byProduct: productAgg.map((x) => ({ product: x._id, count: x.count })),
      trend: last30,
      recentEnquiries,
      activity,
    });
  } catch (e) {
    next(e);
  }
}

async function trendBuckets() {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  return Enquiry.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
}

async function recentActivity() {
  const rows = await Enquiry.aggregate([
    { $unwind: '$timeline' },
    { $sort: { 'timeline.createdAt': -1 } },
    { $limit: 25 },
    {
      $project: {
        type: '$timeline.type',
        description: '$timeline.description',
        adminName: '$timeline.adminName',
        createdAt: '$timeline.createdAt',
        enquiryId: '$enquiryId',
        customerName: '$customerName',
      },
    },
  ]);
  return rows;
}

export async function countriesReport(req, res, next) {
  try {
    const rows = await Enquiry.aggregate([
      { $match: { country: { $nin: ['', null] } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const total = rows.reduce((a, b) => a + b.count, 0);
    res.json({
      rows: rows.map((r) => ({
        country: r._id,
        count: r.count,
        pct: total ? Math.round((r.count / total) * 1000) / 10 : 0,
      })),
      total,
    });
  } catch (e) {
    next(e);
  }
}

export async function productsReport(req, res, next) {
  try {
    const rows = await Enquiry.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productName',
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $nin: ['', null] } } },
      { $sort: { count: -1 } },
      { $limit: 30 },
    ]);
    res.json({ rows: rows.map((r) => ({ product: r._id, count: r.count })) });
  } catch (e) {
    next(e);
  }
}

export async function trends(req, res, next) {
  try {
    const days = Math.min(90, Math.max(7, Number(req.query.days) || 30));
    const since = new Date();
    since.setDate(since.getDate() - days);
    const match = { createdAt: { $gte: since } };
    if (req.query.country?.trim()) match.country = new RegExp(req.query.country.trim(), 'i');

    const buckets = await Enquiry.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ buckets });
  } catch (e) {
    next(e);
  }
}
