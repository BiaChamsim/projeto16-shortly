import { Router } from 'express';
import {signUp, login} from '../controllers/authController.js';
import validateSignUp from '../middlewares/validateSignUp.js';
import validateLogin from '../middlewares/validateLogin.js';

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateLogin, login);




export default router;