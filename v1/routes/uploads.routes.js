import express from "express"; 
import {uploadImage} from "../controllers/uploads.controllers.js"; 

const router=express.Router(); 

router.post("/image",uploadImage); 

export default router;
