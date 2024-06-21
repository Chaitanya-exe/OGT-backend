import express from "express";
import { createProjects, deleteProject, getAllProjects, getOneProject, updateProject } from "../controllers/projects.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post('/create', verifyToken, createProjects);
router.get('/getOneProject', verifyToken, getOneProject);
router.get('/getAllProjects', getAllProjects);
router.post('/updateProject/:id', verifyToken, updateProject);
router.delete('/deleteProject/:id',verifyToken, deleteProject);

export default router;