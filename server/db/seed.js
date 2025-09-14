import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDb from "./connection.js";
import Tenant from "../models/tenant.js"
import User from "../models/user.js"

dotenv.config();
connectDb();

const seed= async() => {
  await Tenant.deleteMany();
  await User.deleteMany();

  const acme = await Tenant.create({name:"Acme",slug:"acme"});
  const globex = await Tenant.create({name : "Globex" ,slug:"globex"});
  
  const hashed =await bcrypt.hash("password",10);

  await User.create([
    {email:"admin@acme.test",password:hashed,role:"admin" ,tenantId:acme._id},
    {email:"user@acme.test" , password:hashed , role:"member",tenantId:acme._id},
    { email: "admin@globex.test", password: hashed, role: "admin", tenantId: globex._id },
    { email: "user@globex.test", password: hashed, role: "member", tenantId: globex._id }

  ]);
  console.log("Seeded!");
  process.exit();
};

seed();