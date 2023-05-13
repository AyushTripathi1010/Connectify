import express from "express";
import { getFeedPosts, getUserPosts, likePost, commentPost, getcommentPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id/comment" , verifyToken, getcommentPost );

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comment" , verifyToken, commentPost );

export default router;
