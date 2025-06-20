const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "docx", "mp4"], // Customize formats
  },
});

const parser = multer({ storage });

module.exports = parser;
