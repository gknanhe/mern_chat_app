import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//add middleware to authorize

//:id is recievers id
//for get message
router.get("/:id", protectRoute, getMessages);

//route for send message
router.post("/send/:id", protectRoute, sendMessage);

export default router;
