import { User, validate } from "../models/user.model";
import _ from "lodash";
import bcrypt from "bcrypt";

// @desc    Get me
// @route   GET /api/users/me
// @access  Private/Admin
const getMe = async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.send(user);
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private
const addUser = async (req, res) => {
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
		.header("access-control-expose-headers", "x-auth-token")
		.send(_.pick(user, ["_id", "name", "email"]));
};

// @desc    Create User
// @route   POST /api/users/
// @access  Private
const createUser = (req, res) => {
	console.log(req.body);
	var personInfo = req.body;

	if (
		!personInfo.email ||
		!personInfo.username ||
		!personInfo.password ||
		!personInfo.passwordConf ||
		!personInfo.contactNo
	) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {
			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							contactNo: personInfo.contactNo,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
						});

						newPerson.save(function (err, Person) {
							if (err) console.log(err);
							else console.log("Success");
						});
					})
						.sort({ _id: -1 })
						.limit(1);
					res.send({ Success: "You are regestered,You can login now." });
				} else {
					res.send({ Success: "Email is already used." });
				}
			});
		} else {
			res.send({ Success: "password is not matched" });
		}
	}
};

// @desc   	login now
// @route   POST /api/users/login
// @access  Private
const loginNow = (req, res) => {
	console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {
			if (data.password == req.body.password) {
				console.log("Done Login");
				//req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({ Success: "Success!" });
			} else {
				res.send({ Success: "Wrong password!" });
			}
		} else {
			res.send({ Success: "This Email Is not regestered!" });
		}
	});
};

// @desc   	logout
// @route   GET /api/users/logout
// @access  Private
const logOut = (req, res) => {
	console.log(req.body);
	console.log("logout");
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				// return res.redirect('/login');
				return res.send("/");
			}
		});
	}
};

// @desc   	forgotpass
// @route   POST /api/users/forgotpass
// @access  Private

const forgotPass = (req, res) => {
	console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ Success: "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save(function (err, Person) {
					if (err) console.log(err);
					else console.log("Success");
					res.send({ Success: "Password changed!" });
				});
			} else {
				res.send({
					Success: "Password does not matched! Both Password should be same.",
				});
			}
		}
	});
};

export { createUser, loginNow, logOut, forgotPass, addUser, getMe };

// import User from "../models/user.model";
// // import _ from "lodash";

// export { sayHello, createUser };

// const auth = require("../middleware/auth");
// const bcrypt = require("bcrypt");

// import { Router } from "express";
// import User from "../models/user.model";
// var express = require("express");
// const router = Router();
// router.use(express.json());

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

// export default router;
