import * as arctic from "arctic";
import dotenv from "dotenv";

dotenv.config();

export const google = new arctic.Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  "http://localhost:5000/api/v1/auth/google/callback"
);
