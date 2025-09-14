import mongoose from "mongoose";

const NotesSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
  },
  tenantId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"tenant",
    required:true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:"true"
  }
})

export default mongoose.model("Note",NotesSchema)