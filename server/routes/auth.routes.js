import { Router } from "express";
const router = Router();
import { postUser } from "../controllers/auth.controller";

router.route("/").post(postUser);

export default router;
