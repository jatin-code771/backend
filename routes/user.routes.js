import express from 'express';
import { registeruser, verifyUser , login, getMe, logoutUser } from '../controller/user.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router =express.Router()

router.post("/register", registeruser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/me", isLoggedIn , getMe );
router.get("/logout", isLoggedIn , logoutUser );

export default router;
