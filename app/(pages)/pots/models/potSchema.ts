import mongoose, { Schema } from "mongoose";

const potSchema = new Schema(
  {
    potName: {
      type: String,
      required: true,
    },
    potAmount: {
      type: Number,
      required: true,
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
