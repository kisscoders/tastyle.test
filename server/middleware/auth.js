import jwt from "jsonwebtoken";
import { authStatus, jwtSecretKey } from "../config/config";
import { User } from "../models/user.model";
import ErrorHander from "../utils/errorhander";

const auth = async function (req, res, next) {
	if (!authStatus) return next();
	const token = req.header("x-auth-token");
	// const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHander("Please Login to access this resource", 401));
	}

	const decodedData = jwt.verify(token, jwtSecretKey);

	req.user = decodedData;
	// req.user = await User.findById(decodedData._id);
	next();

	// const token = req.header("x-auth-token");
	// if (!token) return res.status(401).send("Access denied. No token provided.");

	// try {
	// 	const decoded = jwt.verify(token, jwtSecretKey);
	// 	req.user = decoded;
	// 	next();
	// } catch (ex) {
	// 	res.status(400).send("Invalid token.");
	// }
};

const admin = function (req, res, next) {
	// 401 Unauthorized
	// 403 Forbidden
	if (!authStatus) return next();

	if (!req.user.role === "admin") return res.status(403).send("Access denied.");

	next();
};

export { auth, admin };

// extra stuff

// import asyncHandler from "express-async-handler";
// import User from "../models/user.model";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not authorized as an admin");
//   }
// };

// export { protect, admin };
