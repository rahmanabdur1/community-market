import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// User interface
export interface IUser extends Document {
  displayName: string;
  email: string;
  password: string;
  roles: ("admin" | "vendor" | "customer" | "user")[];
  emailVerified: boolean;
  emailVerificationToken?: string | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "vendor", "customer", "user"],
      default: ["user"],
    },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true }
);

// 🔐 Hash password before save
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare candidate password
userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// Export model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
