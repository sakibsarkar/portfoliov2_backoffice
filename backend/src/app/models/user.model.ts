import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
