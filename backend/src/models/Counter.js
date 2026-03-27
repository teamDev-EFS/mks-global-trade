import mongoose from 'mongoose';

/** Year-scoped sequence for human-readable enquiry IDs. */
const counterSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, unique: true },
    seq: { type: Number, default: 0 },
  },
  { collection: 'counters' }
);

export default mongoose.model('Counter', counterSchema);
