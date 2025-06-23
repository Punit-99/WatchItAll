import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: false, // May not exist for Google login
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Not required for OAuth users
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      enum: ["local", "google"], // add more if needed
      default: "local",
    },
    googleId: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
