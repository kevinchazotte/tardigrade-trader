# API

This project provides the API and database layer.

A PostgreSQL database is containerized and can be run via `docker compose -f api/docker-compose.yml up db`, which uses the docker-compose.yml configuration. It should be torn down using `docker compose down db` or `docker compose down -v db` to remove the volume.

The API layer is, for now, separately containerized and can be built and deployed via `docker build -f api/Dockerfile -t dashboard-api:0.0 .` and `docker run --env-file .env -p 5000:5000 dashboard-api:0.0`.

When both components are separately containerized in this way, the .env `DB_HOST` variable should be set to `host.docker.internal` to reflect that. The API layer can alternatively be run locally via `npm run dev` or `npm run start`. In this situation, the .env `DB_HOST` variable should be set to `localhost`.
