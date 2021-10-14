import "dotenv/config";
import {
	db,
	serverPort,
	jwtPrivateKey,
	requiresAuth,
	jwtExpirePeriod,
	cookieExpirePeriod,
	cloudApiKey,
	cloudApiSecret,
	cloudName,
} from "./default.json";

export const port = process.env.PORT || serverPort;
export const url = process.env.MONGODB_URI || db;
export const jwtSecretKey = process.env.JWT_KEY || jwtPrivateKey;
export const authStatus = process.env.REQ_AUTH || requiresAuth;
export const jwtExpire = process.env.JWT_EXPIRE || jwtExpirePeriod;
export const cookieExpire = process.env.COOKIE_EXPIRE || cookieExpirePeriod;
export const cloud_name = process.env.CLOUD_NAME || cloudName;
export const api_key = process.env.API_KEY || cloudApiKey;
export const api_secret = process.env.API_SECRET || cloudApiSecret;

// module.exports = function() {
//   if (!config.get('jwtPrivateKey')) {
//     throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
//   }
// }
