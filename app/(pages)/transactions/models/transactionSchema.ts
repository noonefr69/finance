import mongoose, { Schema } from "mongoose";

const transactionShema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    transactionName: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    transactionCategory: {
      type: String,
      required: true,
    },
    transactionAmount: {
      type: Number,
      required: true,
    },
    transactionRecurring: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionShema);

export default Transaction;
