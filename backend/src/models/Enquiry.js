import mongoose from 'mongoose';

const productLineSchema = new mongoose.Schema(
  {
    productId: { type: String, default: '' },
    productName: { type: String, default: '' },
    category: { type: String, default: '' },
    variant: { type: String, default: '' },
    quantity: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const adminNoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    adminName: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const timelineEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['created', 'status_change', 'note_added', 'whatsapp', 'notification', 'assigned', 'priority_change'],
      required: true,
    },
    description: { type: String, default: '' },
    meta: { type: mongoose.Schema.Types.Mixed },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    adminName: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: { type: String, unique: true, required: true, index: true },
    sourceType: {
      type: String,
      enum: ['contact_form', 'product_modal', 'inquiry_list'],
      required: true,
      index: true,
    },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, default: '', trim: true },
    location: { type: String, default: '' },
    country: { type: String, default: '', index: true },
    city: { type: String, default: '' },
    message: { type: String, default: '' },
    products: { type: [productLineSchema], default: [] },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'archived'],
      default: 'new',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      index: true,
    },
    tags: [{ type: String }],
    adminNotes: [adminNoteSchema],
    timeline: [timelineEventSchema],
    notificationRead: { type: Boolean, default: false },
    isUnread: { type: Boolean, default: true },
    contactedViaWhatsApp: { type: Boolean, default: false },
    contactedAt: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ customerName: 'text', phone: 'text', 'products.productName': 'text' });
enquirySchema.index({ phone: 1 });
enquirySchema.index({ 'products.productName': 1 });

export default mongoose.model('Enquiry', enquirySchema);
