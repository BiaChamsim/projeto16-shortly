import { Router } from "express";

import { getRanking } from "../controllers/rankingController.js";
import validateToken from "../middlewares/validateToken.js"


const router = Router();


router.get("/ranking", validateToken, getRanking);



export default router;