import cloudinary from "../config/cloudinary";

export const uploadImage = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "demo" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(file.buffer);
  });
};