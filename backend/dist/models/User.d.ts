import { Document, Model } from "mongoose";
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
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map