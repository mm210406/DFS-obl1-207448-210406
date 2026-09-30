import app from "./app.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CineReview API escuchando en el puerto ${PORT}`));
