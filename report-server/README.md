

# Ejecutar en Dev

1. clonar el repositorio
2. Instalar dependencias `npm install`
3. Clonar `.env.template` y renombraar a `.env` y completar las variables de entornos en .env
4. Levantar la base de datos `docker compose up -d`
5. Generar el Prisma client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`