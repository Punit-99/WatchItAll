import express from "express";
import { upload } from "../../utils/cloudinaryConfig.js";
import { handleFileUpload } from "../../controllers/admin/adminController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
