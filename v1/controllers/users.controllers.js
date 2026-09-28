import { getProfileService, upgradePlanService } from "../services/users.services.js";

export const getProfile = async (req, res) => {
  const profile = await getProfileService(req.user.userId);
  res.json(profile);
};

export const upgradePlan = async (req, res) => {
  const result = await upgradePlanService(req.user.userId);

  res.json({
    mensaje: "Plan actualizado",
    token: result.token,
    user: result.user,
  });
};
