import mongoose, { Schema } from "mongoose";

const userNameSchema = new Schema(
  {
    userEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserName =
  mongoose.models.UserName || mongoose.model("UserName", userNameSchema);

export default UserName;
