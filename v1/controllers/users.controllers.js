import { upgradePlanService } from "../services/users.services.js";

export const upgradePlan = async (req, res) => {

    const user = await upgradePlanService(
        req.user.userId
    );

    res.json({
        mensaje: "Plan actualizado",
        user: user
    });
};