import multer from "multer";

const storage = multer.memoryStorage();

export const MAX_IMAGE_SIZE_MB = 4;

export const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024 },
});
