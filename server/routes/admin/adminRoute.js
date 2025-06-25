import express from "express";
import { upload } from "../../utils/cloudinaryConfig.js";
import {
  handleFileUpload,
  handleDeleteUpload,
} from "../../controllers/admin/adminController.js";

const router = express.Router();

router.post("/upload-file", upload.single("file"), handleFileUpload);
router.post("/delete-file", handleDeleteUpload);

export default router;
