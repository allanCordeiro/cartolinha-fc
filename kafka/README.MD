# Kafka Server

Servidor Kafka que realiza a comunicação dos eventos entre o servidor de Administração Django e o consolidador.

Além do Kafka, está contido no yaml o Zookeeper, o Control Center (para visualização dos tópicos) e uma instância utilizada somente para subir o container, responsável por criar os tópicos necessários para funcionamento da solução.

Para subir o container:

```
docker-compose up -d
```

O Control Center deverá estar disponibilizado em: http://localhost:9021/
