import { connect } from "mongoose";
import { url } from "../config/config";

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
