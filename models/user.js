import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  personal_name: { type: String, required: true, maxlength: 50 },
  company_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 5000 },
  role: {
    type: String,
    required: true,
    maxlength: 50,
    enum: ["admin", "vendor"],
  },
  image: { type: String, maxlength: 500 },
  set_by_admin: { type: Boolean, required: true, default: false },
  is_active: { type: Boolean, default: true },
});
export default mongoose.model("User", schema);
