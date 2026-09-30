import { upload, MAX_IMAGE_SIZE_MB } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";

const CLOUDINARY_FOLDER = "cine-review";

export const uploadImage = async (req, res) => {
  try {
    await runMulterSingle(upload, "imagen", req, res);
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ mensaje: `La imagen no puede superar los ${MAX_IMAGE_SIZE_MB} MB` });
    }
    return res.status(400).json({ mensaje: "No se pudo leer el archivo enviado" });
  }

  if (!req.file) {
    return res.status(400).json({ mensaje: "No se subió ningún archivo en el campo 'imagen'" });
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ mensaje: "El archivo debe ser una imagen" });
  }

  try {
    const result = await uploadBufferToCloudinary(cloudinary, req.file.buffer, {
      resource_type: "image",
      folder: CLOUDINARY_FOLDER,
    });

    return res.status(201).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error al subir imagen:", error.message);
    return res.status(503).json({ mensaje: "El servicio de imágenes no está disponible" });
  }
};
