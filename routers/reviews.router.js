import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createReview );
router.get("/:id", getReviews );
router.delete("/:id", verifyToken ,deleteReview);

export default router;