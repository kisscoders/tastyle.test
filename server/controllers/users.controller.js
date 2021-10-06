import { User, validate } from "../models/user.model";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";

// @desc    Get me
// @route   GET /api/users/me
// @access  User / Admin
// TODO: [TSW-22]
// Find out why getMe is not working
// Find out the use case of this function
const getMe = async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.send(user);
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already registered.");

	user = new User(_.pick(req.body, ["name", "email", "password"]));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res
		.header("x-auth-token", token)
		.header("access-control-expose-headers", "x-auth-token") // to make custom headers visible
		.send(_.pick(user, ["_id", "name", "email"]));
};

// @desc    Login and authorization
// @route   POST /api/users/auth
// @access  Public
const loginUser = async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password.");

	const token = user.generateAuthToken();
	res.send(token);
};

// Using joi to validate login input is as required
function validateLogin(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});

	return schema.validate(req);
}

export { createUser, getMe, loginUser };

// TODO:
// Need to get the responses from the following function into the create
// user function to better respond to the situation

// const createUser = (req, res) => {
// 	console.log(req.body);
// 	var personInfo = req.body;

// 	if (
// 		!personInfo.email ||
// 		!personInfo.username ||
// 		!personInfo.password ||
// 		!personInfo.passwordConf ||
// 		!personInfo.contactNo
// 	) {
// 		res.send();
// 	} else {
// 		if (personInfo.password == personInfo.passwordConf) {
// 			User.findOne({ email: personInfo.email }, function (err, data) {
// 				if (!data) {
// 					var c;
// 					User.findOne({}, function (err, data) {
// 						if (data) {
// 							console.log("if");
// 							c = data.unique_id + 1;
// 						} else {
// 							c = 1;
// 						}

// 						var newPerson = new User({
// 							unique_id: c,
// 							email: personInfo.email,
// 							username: personInfo.username,
// 							contactNo: personInfo.contactNo,
// 							password: personInfo.password,
// 							passwordConf: personInfo.passwordConf,
// 						});

// 						newPerson.save(function (err, Person) {
// 							if (err) console.log(err);
// 							else console.log("Success");
// 						});
// 					})
// 						.sort({ _id: -1 })
// 						.limit(1);
// 					res.send({ Success: "You are regestered,You can login now." });
// 				} else {
// 					res.send({ Success: "Email is already used." });
// 				}
// 			});
// 		} else {
// 			res.send({ Success: "password is not matched" });
// 		}
// 	}
// };

// const loginNow = (req, res) => {
// 	console.log(req.body);
// 	User.findOne({ email: req.body.email }, function (err, data) {
// 		if (data) {
// 			if (data.password == req.body.password) {
// 				console.log("Done Login");
// 				//req.session.userId = data.unique_id;
// 				//console.log(req.session.userId);
// 				res.send({ Success: "Success!" });
// 			} else {
// 				res.send({ Success: "Wrong password!" });
// 			}
// 		} else {
// 			res.send({ Success: "This Email Is not regestered!" });
// 		}
// 	});
// };

// router.route("/").post(async (request, response) => {
//   try {
//     const user = new User(request.body);
//     await user.save();
//     return response.status(200).json("User created!");
//   } catch (error) {
//     return response.status(400).send(error);
//   }
// });

// router.route("/").get(async (_, response) => {
//   const users = await User.find();
//   return response.status(200).json(users);
// });
