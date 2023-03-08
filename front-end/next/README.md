# Cartolinha Front-end

Aqui é o front end, feito em Next/Typescript. Ele consome os dados provenientes do Consolidador Em Go.

Pra subir a aplicação, necessário Docker/docker compose. A dependência é o consolidador Go (já deve estar running ao subir este serviço.):

```
docker-compose up -d
```

O arquivo `.docker/start.dev.sh` já possui os comandos para execução das migrations.

Após subir subir o serviço, entrar no container e subir o server django com os seguintes comandos:

```
docker compose exec app bash
npm run dev
```

A página estará disponível em http://localhost:3000.

