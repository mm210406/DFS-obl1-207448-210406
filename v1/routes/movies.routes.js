import express from "express";
import {searchMovies} from "../controllers/movies.controllers.js"; 

const router=express.Router(); 

router.get("/external-search",searchMovies); 

export default router;
