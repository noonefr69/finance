import mongoose, { Schema } from "mongoose";

const potSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    potName: {
      type: String,
      required: true,
    },
    potAmount: {
      type: Number,
      required: true,
    },
    potAmountValue: {
      type: Number,
    },
    potTheme: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pot = mongoose.models.Pot || mongoose.model("Pot", potSchema);

export default Pot;
