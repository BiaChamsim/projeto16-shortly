import { Router } from "express";

import validateToken from "../middlewares/validateToken.js";
import { getUsers } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", validateToken, getUsers)

export default router;