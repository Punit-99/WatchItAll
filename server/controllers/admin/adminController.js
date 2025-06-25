import { cloudinary } from "../../utils/cloudinaryConfig.js";

export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(req.file);
    const { path, filename, mimetype, size } = req.file;
    const resourceType = req.file.mimetype.startsWith("image/")
      ? "image"
      : req.file.mimetype.startsWith("video/")
      ? "video"
      : "raw";

    res.json({
      success: true,
      url: path,
      public_id: filename,
      mimetype,
      resourceType,
      size,
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleDeleteUpload = async (req, res) => {
  try {
    const { public_id, resourceType } = req.body;
    console.log(public_id);
    if (!public_id) {
      return res.status(400).json({ message: "Missing public_id" });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resourceType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({ message: "Failed to delete file" });
    }

    console.log("deleted", result);
    res.status(200).json({ message: "File deleted successfully", result });
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    res.status(500).json({ message: "Server error while deleting file" });
  }
};
