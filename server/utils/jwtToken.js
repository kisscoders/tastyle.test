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
		.header("access-control-expose-headers", "x-auth-token") // to make custom headers visible
		.header("x-auth-token", token)
		.cookie("token", token)
		.json({ success: true, user, token });
};
export { sendToken };
