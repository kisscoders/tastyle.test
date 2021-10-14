// import bcrypt from "bcrypt";
// import Joi from "joi";
import crypto from "crypto";
import User from "../models/user.model";
import { sendToken } from "../utils/jwtToken";
import ErrorHander from "../middleware/errorhander";
import catchAsyncErrors from "../middleware/error";
import cloudinary from "../utils/cloudinary";
// const sendEmail = require("../utils/sendEmail");

// @desc    Create new user
// @route   POST /api/users
// @access  Public
const createUser = catchAsyncErrors(async (req, res) => {
	// const { error } = validate(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	const result = await cloudinary.uploader.upload(req.file.path);

	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});
	// 	const salt = await bcrypt.genSalt(10);
	// 	user.password = await bcrypt.hash(user.password, salt);
	sendToken(user, 201, res);
});

// @desc    Login and authorization
// @route   POST /api/users/auth
// @access  Public
const loginUser = async (req, res, next) => {
	const { email, password } = req.body;

	// checking if user has given password and email both
	if (!email || !password) {
		return next(new ErrorHander("Please Enter Email & Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHander("Invalid Email", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander("Invalid Password", 401));
	}

	sendToken(user, 200, res);
};

// @desc    Logout
// @route   POST /api/users/logout
// @access  Private
// const logoutUser = catchAsyncErrors(async (req, res, next) => {
// 	res.cookie("token", null, {
// 		expires: new Date(Date.now()),
// 		httpOnly: true,
// 	});

// 	res.status(200).json({
// 		success: true,
// 		message: "Logged Out",
// 	});
// });

// @desc    Get me
// @route   GET /api/users/me
// @access  User / Admin
// const getMe = catchAsyncErrors(async (req, res) => {
// 	const user = await User.findById(req.user._id).select("-password");

// 	res.status(200).json({
// 		success: true,
// 		user,
// 	});
// });

// @desc    Get a user's detail by id
// @route   GET /api/users/:id
// @access  Admin
const getUserDetail = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");

	res.status(200).json({
		success: true,
		user,
	});
});

// @desc    Forgot password request
// @route   POST /api/users/pass/forgot
// @access  Public
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander("User not found", 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `tastyle password recovery service`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

// @desc    Reset password
// @route   POST /api/users/pass/reset
// @access  Public
const resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHander("Reset Password Token is invalid or has been expired", 400)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander("Password does not password", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// @desc    Updating Password
// @route   POST /api/users/pass/:id
// @access  Private
const updatePass = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander("Old password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander("Passwords do not match!", 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// @desc    Updating Profile
// @route   POST /api/users/profile/:id
// @access  Private
const updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	if (req.body.avatar !== "") {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: "avatars",
			width: 150,
			crop: "scale",
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		user,
	});
});

// @desc    Get a list of all users
// @route   GET /api/users/
// @access  Admin
const getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get single user (admin)
//   const getSingleUser = catchAsyncErrors(async (req, res, next) => {
// 	const user = await User.findById(req.params.id);

// 	if (!user) {
// 	  return next(
// 		new ErrorHander(`User does not exist with Id: ${req.params.id}`)
// 	  );
// 	}

// 	res.status(200).json({
// 	  success: true,
// 	  user,
// 	});
//   });

// @desc    Update User Role
// @route   POST /api/users/role/:id
// @access  Admin
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	// const imageId = user.avatar.public_id;

	// await cloudinary.v2.uploader.destroy(imageId);

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User Deleted Successfully",
	});
});

export {
	createUser,
	loginUser,
	updatePass,
	updateProfile,
	updateUserRole,
	forgotPassword,
	resetPassword,
	deleteUser,
	getAllUser,
	getUserDetail,
};

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
