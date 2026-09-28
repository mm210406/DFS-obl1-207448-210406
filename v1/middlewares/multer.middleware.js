import multer from "multer";

const storage = multer.memoryStorage();

export const MAX_IMAGE_SIZE_MB = 5;

export const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024 },
});
