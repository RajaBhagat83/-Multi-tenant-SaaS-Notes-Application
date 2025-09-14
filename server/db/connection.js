import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

 const mongoURI  =process.env.MONGO_URI;
// cd 

const connectDb =  async () => {
  try{
    const conn = await mongoose.connect(mongoURI );
    console.log(`MongoDB connected : ${conn.connection.host}`);
  }catch(err){
    console.log(`Error : ${err.message}`);
    process.exit(1);
  }
}
export default connectDb;