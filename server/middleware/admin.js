import { requiresAuth } from "../config/default.json";

const admin = function (req, res, next) {
	// 401 Unauthorized
	// 403 Forbidden
	if (!requiresAuth) return next();

	if (!req.user.role === "admin") return res.status(403).send("Access denied.");

	next();
};

export { admin };
