import { auth } from "../middleware/auth";
import { Router } from "express";
const router = Router();
import { addUser, getMe } from "../controllers/users.controller";

router.route("/me").get(auth, getMe);
router.route("/").post(addUser);

export default router;

// import { Router } from "express";
// const router = Router();
// // import { auth } from "../middleware/auth";

// import {
//   sayHello, // @route   GET /api/users/me
//   createUser, // @route   POST /api/users
//   loginNow,   // @route   POST /api/users/login
//   logOut, //@route   POST /api/users/login
//   forgotPass, //@route   POST /api/users/forgotpass
// } from "../controllers/users.controller";

// router.route("/").post(createUser).get(sayHello);
// router.route("/login").post(loginNow);
// router.route("/logout").get(logOut);
// router.route("/forgotpass").post(forgotPass);
// // router.route("/me").get(getMe);


// router.route("/").post(createUser).get(sayHello);
// router.route("/me").get(getMe);

// export default router;

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send("User already registered.");

//   user = new User(_.pick(req.body, ["name", "email", "password"]));
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   await user.save();

//   const token = user.generateAuthToken();
//   res
//     .header("x-auth-token", token)
//     .send(_.pick(user, ["_id", "name", "email"]));
// });

// module.exports = router;
