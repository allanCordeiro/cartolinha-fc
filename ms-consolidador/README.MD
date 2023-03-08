# Consolidador

O Consolidador é feito em Golang e tem como objetivo enviar os dados alterados no administrador para o front-end.

Ele é uma API e, um consumidor de dados de tópicos disponíveis no Kafka.

Pra subir a aplicação, necessário Docker/docker compose (considerando que o serviço do Kafka já esteja rodando):

```
docker-compose up -d
```


```
docker compose exec goapp bash
migrate -source file:///go/app/sql/migrations -database 'mysql://root:root@tcp(mysql:3306)/cartolinha' up
go run cmd/cartolinha/main.go
```


Os endpoints ficaram disponíveis em http://localhost:8080