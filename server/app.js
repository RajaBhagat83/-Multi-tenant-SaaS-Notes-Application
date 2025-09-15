import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import connectDb from "./db/connection.js"
import noteRouter from "./routes/noteRouter.js"
import tenantRoutes from "./routes/tenantRoutes.js"
import cors from "cors"

dotenv.config();
const app=express();


connectDb();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: "https://multi-tenant-saa-s-notes-applicatio-fawn.vercel.app/",
  credentials: true
}));


//Health Check 
app.get("/health",(req,res) => res.json({status :"ok"}));

//Routes
app.use("/auth",authRoutes);
app.use("/notes",noteRouter);
app.use("/tenants",tenantRoutes);

const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
})
