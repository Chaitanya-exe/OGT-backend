import express from "express";
import { getMessages, createMessage } from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/getMessages", getMessages);
router.post("/createMessage", createMessage);

export default router;