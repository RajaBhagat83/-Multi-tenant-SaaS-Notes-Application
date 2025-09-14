import Tenant from "../models/tenant.js"

export const upgradeTenant = async (req,res) => {
  try{
    const tenant = await Tenant.findOne({slug :req.params.slug});
    if(!tenant) return res.status(404).json({message:"Tenant not found"});

    tenant.plan = "pro";
    await tenant.save();
    res.json({message : `${tenant.name} upgraded to Pro plan successfully`});
  }catch(err) {
    res.status(500).json({message : err.message});
  }
}