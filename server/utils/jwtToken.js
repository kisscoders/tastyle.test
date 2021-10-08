// Create Token and saving in cookie
// import { cookieExpire } from "../config/config";
// import _ from "lodash";

const sendToken = (user, statusCode, res) => {
	const token = user.generateAuthToken();

	// options for cookie
	// const options = {
	// 	expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
	// 	httpOnly: true,
	// };

	res
		.status(statusCode)
		.header("x-auth-token", token)
		.header("access-control-expose-headers", "x-auth-token") // to make custom headers visible
		.cookie("token", token)
		.json({ success: true, user, token });
	// .json({ success: true, details: _.pick(user, ["_id", "name", "email"]) });
};
export { sendToken };
