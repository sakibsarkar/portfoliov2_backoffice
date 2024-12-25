"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["user", "admin", "player"] },
    password: { type: String, required: true },
    image: { type: String, default: "/images/user.jpg" },
    passwordResetToken: { type: String, required: false },
    passwordResetExpiry: { type: Date, required: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
