import Counter from '../models/Counter.js';

export async function nextEnquiryHumanId() {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { year },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  return `ENQ-${year}-${String(counter.seq).padStart(4, '0')}`;
}
