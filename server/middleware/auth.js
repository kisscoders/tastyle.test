import jwt from "jsonwebtoken";
import { authStatus, jwtSecretKey } from "../config/config";
import ErrorHander from "../middleware/errorhander";

const auth = async function (req, res, next) {
	if (!authStatus) return next();
	const token = req.header("x-auth-token");
	// const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHander("Please Login to access this resource", 401));
	}

	const decodedData = jwt.verify(token, jwtSecretKey);

	req.user = decodedData;
	next();
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
