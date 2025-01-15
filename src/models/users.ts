import { UserType } from "@/interface";
import mongoose, { Model, Schema } from "mongoose";

export interface UserDocument extends Document, UserType{
  createdAt: Date
};


const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true,
  }
);

const User: Model<UserDocument> =  mongoose.models?.users || mongoose.model("users", userSchema);

export default User;
