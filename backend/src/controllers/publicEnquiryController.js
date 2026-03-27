import { parsePublicEnquiry } from '../validators/enquiryPublic.js';
import { createPublicEnquiry } from '../services/enquiryService.js';

export async function createEnquiry(req, res, next) {
  try {
    const raw = parsePublicEnquiry(req.body);
    const enquiry = await createPublicEnquiry(raw, req);
    res.status(201).json({
      success: true,
      enquiryId: enquiry.enquiryId,
      id: enquiry._id.toString(),
      enquiry: {
        id: enquiry._id,
        enquiryId: enquiry.enquiryId,
        status: enquiry.status,
      },
    });
  } catch (e) {
    next(e);
  }
}
