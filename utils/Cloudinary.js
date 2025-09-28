import cloudinary from "../config/Cloudinary_config.js";
import { configureCloudinary } from '../config/Cloudinary_config.js';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const UploadonCloudinary = async (fileBuffer, maxRetries = 3) => {
  configureCloudinary();

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      // Use upload_stream with buffer instead of upload with file path
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "green-uploads",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        
        // End the stream with the buffer data
        uploadStream.end(fileBuffer);
      });

      return {
        success: true,
        result,
      };
    } catch (error) {
      attempt++;
      console.error(`Cloudinary upload attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        return {
          success: false,
          message: "Failed to upload image",
        };
      }
      await delay(2 ** attempt * 1000);
    }
  }
};
