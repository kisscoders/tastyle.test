import "dotenv/config";
const cloudinary = require("cloudinary").v2;
import { connect } from "mongoose";
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
const cloud_name = process.env.CLOUD_NAME || cloudName;
const api_key = process.env.API_KEY || cloudApiKey;
const api_secret = process.env.API_SECRET || cloudApiSecret;

// cloudinary congifuration
cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret,
});

// connecting to mongodb via mongoose
const connectDB = async () => {
	try {
		const conn = await connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log(`mongodb joined on: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
export { cloudinary };
// extra stuff

// const config = require('config');

// module.exports = function() {
//   if (!config.get('jwtPrivateKey')) {
//     throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
//   }
// }
