# DeFlick Admin Guide

## Как войти

1. Открой `/admin`.
2. Введи логин и пароль из переменных окружения `ADMIN_USERNAME` и `ADMIN_PASSWORD`.
3. Для локального демо можно использовать значения из `.env.example`.

## Как добавить проект

1. В блоке `Проекты` введи название проекта.
2. Нажми `Создать draft`.
3. Проект появится как черновик.
4. Заполни название, порядок, видимость и статус.

## Как загрузить изображения и teaser video

В текущей локальной версии загрузка файлов еще не подключена к серверу. Для production это делается через Payload Media collection.

Нужные поля:

- cover image
- mobile cover image
- poster image
- hover teaser
- gallery images
- behind-the-scenes images

## Как подключить Mux, Vimeo или YouTube

В проектной модели уже предусмотрены поля:

- Mux playback ID
- Vimeo URL
- YouTube URL
- direct MP4 URL
- direct WebM URL
- captions

Mux включается после добавления `MUX_TOKEN_ID` и `MUX_TOKEN_SECRET`.

## Как менять порядок проектов

В `/admin` у каждого проекта есть поле `order`. Меньшее число показывается выше.

## Как preview и publish

1. `Draft` оставляет запись как черновик.
2. `Published` помечает запись как опубликованную.
3. `Preview` открывает публичный URL проекта.
4. Для настоящего сохранения на сервер нужно подключить Payload + PostgreSQL.

## Как редактировать клиентов и homepage text

В `/admin` можно менять:

- homepage headline
- homepage introduction
- business email
- location
- visibility клиентов
- visibility/order/status проектов

## Как сделать backup

1. Нажми `Export JSON`.
2. Сохрани файл `deflick-content.json`.
3. После подключения Payload backup нужно делать на уровне PostgreSQL и media storage.
