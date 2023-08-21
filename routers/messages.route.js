import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getMessages, createMessage } from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/getMessages", verifyToken,getMessages);
router.post("/createMessage", verifyToken,createMessage);

export default router;