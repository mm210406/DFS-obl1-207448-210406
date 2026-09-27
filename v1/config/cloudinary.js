import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloud name:", cloudinary.config().cloud_name);
console.log("API Key cargada:", !!cloudinary.config().api_key);
console.log("API Secret cargado:", !!cloudinary.config().api_secret);

export default cloudinary;