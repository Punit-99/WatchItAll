import { cloudinary } from "../../utils/cloudinaryConfig.js";

export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { path, filename, mimetype, size } = req.file;

    console.log("Uploaded file details:", req.file);

    res.json({
      success: true,
      url: path,
      public_id: filename,
      mimetype,
      size,
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleFileUploadDeleteUpload = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: "Missing public_id" });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "auto",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({ message: "Failed to delete file" });
    }

    res.status(200).json({ message: "File deleted successfully", result });
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    res.status(500).json({ message: "Server error while deleting file" });
  }
};
