import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = Schema({
  name: { type: String, required: true, maxlength: 50 },
  code: {
    type: String,
    required: true,
    maxlength: 2,
    minlength: 2,
    lowercase: true,
  },
});
export default mongoose.model("Language", schema);
