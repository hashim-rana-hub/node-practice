const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { path, originalname } = req.file;

  res.status(201).json({
    message: "File uploaded successfully",
    fileUrl: path,
    fileName: originalname,
    uploadedBy: req.user.userId,
  });
};

const uploadMultipleFiles = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => ({
    fileUrl: file.path,
    fileName: file.originalname,
  }));

  res.status(201).json({
    message: "Files uploaded successfully",
    files,
    uploadedBy: req.user.userId,
  });
};

module.exports = { uploadFile, uploadMultipleFiles };
