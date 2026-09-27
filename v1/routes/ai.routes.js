import express from "express";
import { generateSummary } from "../controllers/ai.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
    res.json({
        mensaje: "Ruta AI funcionando"
    });
});

router.post("/reviews/:id/summary", generateSummary);

export default router;