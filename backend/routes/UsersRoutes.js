import express from "express";
import { createUser, getUsers, getUserByUserId } from "../controllers/UsersController.js";

const router = express.Router();

router.post('/create_user', createUser);
router.get('/get_users', getUsers);
router.get('/get_users/:userid', getUserByUserId)

export default router;