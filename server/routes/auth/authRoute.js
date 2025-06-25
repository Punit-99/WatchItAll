import { Router } from "express";
import {
  googleLoginPage,
  googleCallback,
} from "../../controllers/auth/googleAuthController.js";

const router = Router();

router.get("/google", googleLoginPage);
router.get("/google/callback", googleCallback); // <-- ADD THIS
export default router;
