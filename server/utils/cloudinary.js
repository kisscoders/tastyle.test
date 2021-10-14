const cloudinary = require("cloudinary").v2;
import { cloud_name, api_key, api_secret } from "../config/config";

cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret,
});

export default cloudinary;
