import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20,
    lowercase: true,
    //trim:true,
    enum:["name"]

    
  },
  
    code: {
      type: String,require: true},
  
});
export default mongoose.model("Territory", schema);