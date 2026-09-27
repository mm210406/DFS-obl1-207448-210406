import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conexión a la base de datos establecida");
    }catch(e){
        console.log("Error al conectarse");
        console.log(e);
        process.exit(1);
    }
}

export default connectDB;