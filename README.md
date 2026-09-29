# CineReview API — Obligatorio 1

API REST de reseñas de películas con enfoque family friendly. Hecha con NodeJS, Express, MongoDB (Mongoose), JWT, Joi y bcryptjs, con la arquitectura vista en clase: `routes → middlewares → controllers → services → models`, versionada en `/v1`.

## Cómo funciona

- **Catálogo (API externa TMDB):** las películas salen de TMDB. El catálogo oculta las películas de géneros bloqueados por el admin y las películas para adultos.
- **Géneros (categorías):** son los géneros de TMDB, identificados por `tmdbId`. El admin decide cuáles están permitidos (`allowed`). No se puede borrar un género con reseñas; para dejar de permitirlo se deshabilita.
- **Reseñas (documento principal):** el usuario elige una película del catálogo por su `tmdbId`. El backend trae el título, la sinopsis y los géneros de TMDB y rechaza la reseña si la película no está permitida. Una reseña por película.
- **Planes:** PLUS permite 4 reseñas y PREMIUM, ilimitadas. El admin no gestiona planes.
- **IA (Groq):** al crear una reseña se generan recomendaciones a partir de las reseñas del usuario. Cada recomendación se verifica contra el catálogo permitido. Si la IA no está disponible, la reseña se guarda igual.
- **Imágenes (Cloudinary):** subida de imágenes de hasta 4 MB. Si una reseña no tiene imagen, se usa el póster de TMDB.

## Puesta en marcha

1. `npm install`
2. Copiar `.env.example` a `.env` y completar las variables.
3. `npm run seed` — crea el admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) y los géneros de TMDB. Terror arranca deshabilitado. Se puede correr más de una vez.
4. `npm run dev`

En Vercel hay que cargar las mismas variables de entorno.

## Rutas

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/v1/auth/register` | Pública | Registro (CLIENT, plan PLUS) con autologin |
| POST | `/v1/auth/login` | Pública | Login |
| GET | `/v1/users/me` | Usuario | Perfil, uso del plan y recomendaciones |
| PATCH | `/v1/users/plan` | Usuario | Cambio de PLUS a PREMIUM |
| GET | `/v1/movies?page=&title=` | Usuario | Catálogo de películas permitidas |
| GET | `/v1/movies/:tmdbId` | Usuario | Detalle de una película |
| GET | `/v1/reviews?page=&limit=&genreId=&points=&title=` | Usuario | Reseñas propias, paginadas y filtradas |
| GET | `/v1/reviews/:id` | Usuario | Una reseña propia |
| POST | `/v1/reviews` | Usuario | Alta: `{ tmdbId, description, points, imageUrl? }` |
| PATCH | `/v1/reviews/:id` | Usuario | Modifica `description`, `points` o `imageUrl` |
| DELETE | `/v1/reviews/:id` | Usuario | Baja |
| GET | `/v1/genres`, `/v1/genres/:id` | Usuario | Consulta de géneros |
| POST | `/v1/genres` | Admin | Alta: `{ tmdbId, name, allowed? }` |
| PATCH | `/v1/genres/:id` | Admin | Modifica `name` o `allowed` |
| DELETE | `/v1/genres/:id` | Admin | Baja (409 si tiene reseñas) |
| POST | `/v1/uploads/image` | Usuario | form-data, campo `imagen` |
