import { admin, auth } from "../middleware/auth";
import { Router } from "express";
const router = Router();
import {
	createUser,
	loginUser,
	getMe,
	getAllUser,
	deleteUser,
	getUserDetail,
} from "../controllers/users.controller";

router.route("/me").get(auth, getMe);
router.route("/auth").post(loginUser);
router.route("/").post(createUser).get([auth, admin], getAllUser);
router
	.route("/:id")
	.get([auth, admin], getUserDetail)
	.delete([auth, admin], deleteUser);

export default router;
