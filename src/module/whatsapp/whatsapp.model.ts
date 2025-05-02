import mongoose from "mongoose";


const whatsappSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  sentAt: { type: Date, default: Date.now }
});

const whatsappModel = mongoose.model('WhatsAppMessage', whatsappSchema);
export default whatsappModel;
