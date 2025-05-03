import mongoose from "mongoose";


const qrCodeSchema = new mongoose.Schema({
  qrCode: {
    type: String, 
    default: '',
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: {
    currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
  },
});

const qrCodeModel = mongoose.model("QrCode", qrCodeSchema);
export default qrCodeModel;
