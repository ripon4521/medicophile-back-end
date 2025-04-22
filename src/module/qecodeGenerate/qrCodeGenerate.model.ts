import mongoose from "mongoose";


const QREventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventId: { type: String, required: true },
  createdAt: { type: Date, default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),  },
});

const qrCodeGenerateModel = mongoose.model('QREvent', QREventSchema);
export default qrCodeGenerateModel;