import { admin, auth } from "../middleware/auth";
import { Router } from "express";
import { avatarsUpload } from "../utils/multer";

import {
	createUser,
	loginUser,
	getAllUser,
	deleteUser,
	getUserDetail,
	updateProfile,
} from "../controllers/users.controller";

const upload = avatarsUpload;
const router = Router();

router.route("/auth").post(loginUser);
router
	.route("/")
	.post(upload.single("avatar"), createUser)
	.get([auth, admin], getAllUser);
router.route("/updateprofile").post(auth, updateProfile);
router
	.route("/:id")
	.get([auth, admin], getUserDetail)
	.delete([auth, admin], deleteUser);

export default router;
