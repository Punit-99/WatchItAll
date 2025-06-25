import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: "pusocloud",
  api_key: 794383366469428,
  api_secret: "5M4uLsn6lqdqJ91zGwVu0CNNsWQ",
});

export const deleteCloudinaryAsset = async (
  publicId,
  resourceType = "image"
) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Delete response:", result);
    return result;
  } catch (error) {
    console.error("Error deleting Cloudinary asset:", error);
    throw error;
  }
};
const run = async (params) => {
  await deleteCloudinaryAsset("thubm_x86adk", "image");
};

run();
