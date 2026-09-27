import User from "../models/user.model.js";
export const upgradePlanService = async userId => {
  const user=await User.findById(userId); if(!user){const e=new Error("Usuario no encontrado");e.status=404;throw e;}
  if(user.plan==="PREMIUM"){const e=new Error("El usuario ya tiene plan PREMIUM");e.status=400;throw e;}
  user.plan="PREMIUM"; await user.save(); return { id:user._id, email:user.email, plan:user.plan };
};
