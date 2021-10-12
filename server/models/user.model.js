import { Schema, model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const Joi = require("joi");
import { jwtSecretKey, jwtExpire } from "../config/config";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	// avatar: {
	// 	public_id: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	url: {
	// 		type: String,
	// 		required: true,
	// 	},
	// },
	role: {
		type: String,
		enum: {
			values: ["user", "admin"],
			message: "{VALUE} is not supported",
		},
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// JWT token genreration
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			role: this.role,
		},
		jwtSecretKey,
		{
			// expiresIn: jwtExpire,
		}
	);
	return token;
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
	// Generating Token
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

// function validate(user) {
// 	const schema = Joi.object({
// 		name: Joi.string().min(2).max(50).required(),
// 		email: Joi.string().min(5).max(255).required().email(),
// 		password: Joi.string().min(5).max(255).required(),
// 	});

// 	return schema.validate(user);
// }

const User = model("User", userSchema);
export { userSchema, User };
export default model("User", userSchema);
