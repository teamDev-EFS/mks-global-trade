import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['new_enquiry', 'status_update', 'note_added'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry', required: true, index: true },
    enquiryHumanId: { type: String, index: true },
    isRead: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

notificationSchema.index({ createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
