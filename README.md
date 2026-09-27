# CineReview - Obligatorio 1
Backend NodeJS/Express/MongoDB siguiendo la arquitectura trabajada en clase: routes -> middlewares -> controllers -> services -> models.

## Funcionalidades
- Registro y login con bcrypt + JWT.
- Plan PLUS por defecto y actualización a PREMIUM.
- CRUD de reseñas. PLUS: máximo 4; PREMIUM: sin límite.
- Listado de reseñas paginado y filtrable por `genreId`, `points` y `title`.
- CRUD de géneros. Escritura solo ADMIN y no se puede eliminar un género usado por reseñas.
- Upload de imagen con Multer + Cloudinary.
- Búsqueda externa de películas usando Wikipedia.
- Resumen de reseña con Groq. Si IA no está disponible, la API sigue funcionando y devuelve `available: false`.
- Sin módulo de auditorías.

## Inicio
1. `npm install`
2. Copiar `.env.example` a `.env` y completar variables.
3. `npm run dev`

## Rutas
Publicas: `POST /v1/auth/register`, `POST /v1/auth/login`.
Protegidas: `PATCH /v1/users/plan`, CRUD `/v1/reviews`, `POST /v1/reviews/:id/summary`, CRUD `/v1/genres`, `GET /v1/movies/external-search?title=...`, `POST /v1/uploads/image`.

## Nota ADMIN
El registro público crea usuarios CLIENT. Para probar operaciones administrativas de géneros, cambiar manualmente `role` a `ADMIN` en MongoDB durante desarrollo. Antes de la entrega se puede agregar un seed controlado si el docente exige un usuario administrador reproducible.
