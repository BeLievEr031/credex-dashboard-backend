import multer from "multer";
// import cloudinary from "cloudinary"
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const uploader = multer({ storage });

export default uploader;


cloudinary.config({
    cloud_name: "dfmuea3kz",
    api_key: "238666216317771",
    api_secret: "hewZ9i4ZPoGxsS6rAIxgTm13Rco",
})

export { cloudinary };