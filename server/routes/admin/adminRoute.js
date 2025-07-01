import express from "express";
import { upload } from "../../utils/cloudinaryConfig.js";
// Cloudinary Routes
import {
  handleFileUpload,
  handleDeleteUpload,
} from "../../controllers/admin/cloudinaryController/adminCloudinaryController.js";
import {
  createShows,
  getAllShows,
} from "../../controllers/admin/showController/adminShowController.js";
// Show Routes

const router = express.Router();

router.post("/upload-file", upload.single("file"), handleFileUpload);
router.post("/delete-file", handleDeleteUpload);
router.post("/create-show", createShows);
router.get("/all-shows", getAllShows);

export default router;
