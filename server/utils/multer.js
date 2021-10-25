import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const path = require("path");
import cloudinary from "./cloudinary";

// Product Folder Storage
const productsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
  },
});

const productsUpload = multer({
  storage: productsStorage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".JPG" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

const avatarsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    width: 150,
    crop: "scale",
  },
});

const avatarsUpload = multer({
  storage: avatarsStorage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export { productsUpload, avatarsUpload };
