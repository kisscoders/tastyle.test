import "dotenv/config";
import { connect } from "mongoose";
import { db, serverPort, jwtPrivateKey, requiresAuth } from "./default.json";

export const port = process.env.PORT || serverPort;
export const url = process.env.MONGODB_URI || db;
export const jwtSecretKey = process.env.JWT_KEY || jwtPrivateKey;
export const authStatus = process.env.REQ_AUTH || requiresAuth;

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

// extra stuff

// const config = require('config');

// module.exports = function() {
//   if (!config.get('jwtPrivateKey')) {
//     throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
//   }
// }
