import { Schema, model } from "mongoose";
// const config = require("config");
import jwt from "jsonwebtoken";
const Joi = require("joi");
import { jwtSecretKey } from "../config/config";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		jwtSecretKey
	);
	return token;
};

function validate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});

	return schema.validate(user);
}

const User = model("User", userSchema);
export { validate, userSchema, User };
export default model("User", userSchema);
