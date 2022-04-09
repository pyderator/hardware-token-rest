## Technologies Used

- Next JS
- Prisma
- Tailwind

## Run

### Install packages

`yarn`

### Use docker to run postgres

```
docker run --name postgres -d -p 5432:5432 -v rwp:/var/lib/postgresql/data/pgdata -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres
```

> Don't forget to update your `.env` file

### Run DB migrations

Use prisma `migrate dev` command to generate and apply migrations.

> Note: Don't run this command in production### Run DB migrations

`npx prisma migrate dev`
