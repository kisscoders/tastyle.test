import { auth } from "../middleware/auth";
import { Router } from "express";
const router = Router();
import { createUser, getMe, loginUser } from "../controllers/users.controller";

router.route("/me").get(auth, getMe);
router.route("/auth").post(loginUser);
router.route("/").post(createUser);

export default router;
