## Быстрый запуск

### 1. Создание `.env`

В корне проекта создать `.env`:

```env id="p3l8kx"
TELEGRAM_BOT_API_URL=https://api.telegram.org/bot<BOT_TOKEN>
```

👉 заменить `<BOT_TOKEN>` на токен Telegram-бота

---

### 2. Запуск проекта

Сборка и запуск всех сервисов:

```bash id="q9w1md"
docker compose up --build
```

---

## Состав сервисов

### RabbitMQ

Очередь сообщений (message broker)

UI управления:

```text id="r1mq0p"
http://localhost:15672
```

Логин/пароль:

```text id="a8k2dd"
guest / guest
```

---

### producer-service (API)

REST API на NestJS

```text id="t5z1aa"
http://localhost:4242
```

---

### Swagger / Scalar документация

```text id="s2c9ww"
http://localhost:4242/docs
```

---

### consumer-service

Микросервис:

* читает сообщения из RabbitMQ
* обрабатывает их

---

## Telegram бот

* базу данных НЕ добавлял
* ID чата Telegram хранится **в оперативной памяти**
* после перезапуска контейнеров ID будет стёрт

---

Перед отправкой запросов на бек надо:

1. Открыть Telegram
2. Найти бота
3. Отправить команду:

```text id="z8x3aa"
/start
```

👉 после этого chat_id сохраняется в памяти и бот сможет отправлять сообщения

---

## Как работает обработка событий

1. Пользователь отправляет POST-запрос на:

```text
/producer/event
```

с любым JSON body, например:

```json
{ "a": "aaa" }
```

2. На стороне `producer-service`:

* к объекту автоматически добавляется `uuid`
* после этого событие отправляется в очередь RabbitMQ

Пример итогового объекта:

```json
{
  "uuid": "generated-uuid",
  "a": "aaa"
}
```

3. `consumer-service`:

* получает сообщение из очереди
* отправляет сообщение в Telegram-бота
* сообщение приходит в чат, который ранее был сохранён через `/start`