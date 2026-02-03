import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Use "Contact" as the model name instead of "ContactSchema"
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
