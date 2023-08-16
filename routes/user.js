import { getUser,getUserFriends,addRemoveFriend } from "../controllers/user.js";
import express from "express";
import {verifyToken} from "../middleware/auth.js"

const router=express.Router();
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",getUserFriends);
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;