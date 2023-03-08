# Administrador

Solução Python/Django que permite criar jogos, jogadores e respectivos dados (como preço inicial), times, bem como habilitar as ações dos jogos durante as partidas.

A persistência está em sqlite, com as fixtures e migrações iniciais para teste já disponibilizadas.

Pra subir a aplicação, necessário Docker/docker compose:

```
docker-compose up -d
```

O arquivo `.docker/start.dev.sh` já possui os comandos para execução das migrations.

Após subir subir o serviço, entrar no container e subir o server django com os seguintes comandos:

```
docker compose exec app bash
pipenv install app
pipenv shell
python manage.py runserver 0.0.0.0:8000
```

A página de administração com framework Django deverá estar disponível em http://localhost:8000

usuário: admin@user.com
senha: secret