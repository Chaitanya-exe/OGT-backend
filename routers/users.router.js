import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { deleteUser, getAllUsers, getOneUser,login,register, updateUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.delete("/deleteUser",verifyToken, deleteUser);
router.get("/getUser/",verifyToken,getOneUser);
router.get("/getUsers",verifyToken, getAllUsers);
router.post("/updateUser/:id",verifyToken, updateUser);

export default router;