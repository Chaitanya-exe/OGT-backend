import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createConversation ,getConversation, deleteConversation } from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/getConversation/:id", verifyToken,getConversation);
router.post("/createConversation",verifyToken,createConversation);
router.delete("/deleteConversation/:id", verifyToken,deleteConversation);

export default router;