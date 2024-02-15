// authRoutes.js

import express from "express";
//ADD .js at end of import file
import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

// Define your authentication routes

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// Export the router
export default router;
