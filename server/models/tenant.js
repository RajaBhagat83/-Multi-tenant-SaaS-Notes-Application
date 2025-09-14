import mongoose from "mongoose";

const tenantSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  slug :{
     type:String,
     unique:true,
     required:true,
  },
  plan:{
    type:String,
    enum:["free","pro"],
    default:"free"
  }
});

export default mongoose.model('Tenant',tenantSchema);