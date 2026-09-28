import express from "express";
import { getProfile, upgradePlan } from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/me", getProfile);
router.patch("/plan", upgradePlan);

export default router;
