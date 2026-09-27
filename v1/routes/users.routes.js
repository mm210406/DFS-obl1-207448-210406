import express from "express";
import { upgradePlan } from "../controllers/users.controllers.js";

const router = express.Router();
router.patch("/plan", upgradePlan);

export default router;
