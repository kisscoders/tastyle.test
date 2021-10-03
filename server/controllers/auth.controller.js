import { User } from "../models/user.model";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";

// @desc    Login and authorization
// @route   POST /api/users/auth
// @access  Public
const postUser = async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password.");

	const token = user.generateAuthToken();
	res.send(token);
};

function validateLogin(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});

	return schema.validate(req);
}

export { postUser };
