# iconic

Stack completo dockerizado para levantar frontend, backend y MySQL sin pasos manuales de SQL.

## Arquitectura

- `iconic-store/`: Frontend Next.js (produccion en Docker, puerto `3000`)
- `backend/`: API Express + TypeScript (puerto `4000`)
- MySQL 8 en contenedor (schema automatico)
- MongoDB Atlas externo por URI

## Requisitos

- Docker Desktop

## Configuracion

1. Copia el archivo de ejemplo en la raiz:

```bash
cp .env.example .env
```

2. Edita `.env` y completa al menos:

- `MYSQL_ROOT_PASSWORD`
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `JWT_SECRET`

`SMTP_EMAIL` y `SMTP_PASSWORD` son opcionales.

## Levantar stack completo

```bash
docker compose up --build
```

Servicios:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api
- MySQL: localhost:3306

## Inicializacion automatica de MySQL

- El schema se crea automaticamente desde:
  - `backend/sql/001_init_schema.sql`
- El seed de productos corre automaticamente al iniciar backend.
- El seed es idempotente (reinserta datos sin depender del estado previo).

## Reset completo de base de datos

Si quieres reiniciar MySQL desde cero:

```bash
docker compose down -v
docker compose up --build
```

Nota: los scripts montados en `/docker-entrypoint-initdb.d/` solo corren cuando el volumen de MySQL esta vacio.

## Checklist de validacion

1. http://localhost:4000/api/health
2. http://localhost:4000/api/health/mysql
3. http://localhost:4000/api/health/mongo
4. http://localhost:3000 mostrando productos
5. registro/login funcionando
6. add to cart bloqueado sin sesion
7. checkout funcionando con sesion
