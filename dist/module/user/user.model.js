"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    // studentId:{ type: mongoose.Schema.ObjectId},
    // teacherId: {type:mongoose.Schema.ObjectId},
    phone: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ["superAdmin", "admin", "teacher", "student"],
    },
    profile_picture: { type: String },
    status: { type: String, enum: ["Active", "Blocked"] },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    pin: { type: String },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
// UserSchema.pre("save", async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });
// UserSchema.post("save", async function (doc, next) {
//   doc.password = "";
//   next();
// });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
