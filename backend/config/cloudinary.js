// backend/config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dswai0wnu",
  api_key: "966464795438561",
  api_secret: "JxdXfkJmL9w-b995vJ5XGmd4oc0",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ReWear", // cloud folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
