import User from "../../server/models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export const login = async(req,res) => {
  const {email,password} =req.body;
  try{
    const user = await User.findOne({ email }).populate("tenantId");;// We populate tenantId so that we have full tenant info
    if(!user)return res.status(400).json({
      message:"Invalid credentials"
    });

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)return res.status(400).json({
      message:"Invalid Credentials"
    });

    const token = jwt.sign({userId:user._id,tenantId : user.tenantId._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}
    );

    res.json({
      token,
      user:{email:user.email,role:user.role,tenant:user.tenantId?.slug,plan: user.tenantId?.plan }
    })
  }catch(err){
    res.status(500).json({message:err.message});
  }
}