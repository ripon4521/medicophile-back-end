"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto")); // for secure random token generation
const paymentInfoSchema = new mongoose_1.Schema(
  {
    transactionId: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash"],
      required: true,
    },
    accountNumber: { type: String, required: true },
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
    },
    paymentDate: { type: Date },
    proofUrl: { type: String },
  },
  { _id: false },
);
const purchaseTokenSchema = new mongoose_1.Schema(
  {
    studentId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    status: {
      type: String,
      enum: [
        "Verified",
        "Unverified",
        "Rejected",
        "Pending",
        "Refunded",
        "Partial",
      ],
      default: "Unverified",
    },
    purchaseToken: { type: String },
    coupon: { type: String },
    price: { type: Number },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    charge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentInfo: { type: paymentInfoSchema, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
// purchaseTokenSchema.pre("save", async function (next) {
//     const doc = this as any;
//     // Generate purchase token if not set
//     if (!doc.purchaseToken) {
//       const unique = crypto.randomBytes(8).toString("hex").toUpperCase();
//       doc.purchaseToken = `PT-${unique}`;
//     }
//     // Set today's payment date if not already set
//     if (!doc.paymentInfo.paymentDate) {
//       doc.paymentInfo.paymentDate = new Date();
//     }
//     // Coupon logic
//     if (doc.coupon) {
//       const couponData = await CouponModel.findOne({
//         coupon: doc.coupon,
//         status: "Active",
//         isDeleted: false,
//       });
//       if (couponData) {
//         const price = doc.price || 0;
//         let discountAmount = 0;
//         if (couponData.discountType === "Percentage") {
//           discountAmount = (price * couponData.discountAmount) / 100;
//         } else if (couponData.discountType === "Fixed") {
//           discountAmount = couponData.discountAmount;
//         }
//         doc.discount = Math.min(discountAmount, price); // prevent negative subtotal
//       } else {
//         doc.discount = 0; // invalid coupon
//       }
//     } else {
//       doc.discount = 0;
//     }
//     doc.subtotal = doc.price;
//     doc.totalAmount = doc.subtotal - doc.discount + doc.charge;
//     if (!doc.paymentInfo.paymentDate) {
//         doc.paymentInfo.paymentDate = new Date();
//       }
//     next();
//   });
// ✅ Pre-save hook to generate token & set payment date
purchaseTokenSchema.pre("save", function (next) {
  const doc = this;
  // Generate secure token if not already set
  if (!doc.purchaseToken) {
    const unique = crypto_1.default
      .randomBytes(8)
      .toString("hex")
      .toUpperCase();
    doc.purchaseToken = `PT-${unique}`;
  }
  // Set today's date in paymentInfo if not already set
  if (!doc.paymentInfo.paymentDate) {
    doc.paymentInfo.paymentDate = new Date();
  }
  next();
});
const PurchaseTokenModel = (0, mongoose_1.model)(
  "PurchaseToken",
  purchaseTokenSchema,
);
exports.default = PurchaseTokenModel;
