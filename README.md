# LetterBot RU — Сайт на GitHub Pages

> Русскоязычный сайт проекта LetterBot.  
> Хостится на GitHub Pages по адресу **https://letterbot.ru**

---

## Быстрый старт — как залить впервые

### Шаг 1 — Создать репозиторий на GitHub

1. Открыть https://github.com/new
2. Имя репозитория: `letterbot-ru` (или любое другое — не важно)
3. Видимость: **Public** (GitHub Pages бесплатно только для публичных)
4. `README` и `.gitignore` — не добавлять, у нас уже всё есть
5. Нажать **Create repository**

---

### Шаг 2 — Загрузить файлы (три способа)

#### Способ A — Через браузер (самый простой, без Git)

1. Открыть созданный репозиторий на GitHub
2. Нажать **Add file → Upload files**
3. Перетащить все файлы и папку `assets/` в загрузчик
4. Внизу написать commit message: `Initial site deploy`
5. Нажать **Commit changes**

> ⚠️ Папку `assets/` нужно загружать отдельно — браузерный загрузчик GitHub поддерживает папки при drag-and-drop.

#### Способ B — Через Git (если установлен)

```bash
# В папке с файлами сайта:
git init
git add .
git commit -m "Initial site deploy"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/letterbot-ru.git
git push -u origin main
```

#### Способ C — GitHub Desktop (графический клиент)

1. Скачать https://desktop.github.com
2. File → New Repository → выбрать папку с файлами сайта
3. Publish repository → выбрать имя, убедиться что Public
4. Push origin

---

### Шаг 3 — Включить GitHub Pages

1. Открыть репозиторий → вкладка **Settings**
2. В левом меню найти **Pages**
3. Раздел **Source** → выбрать **Deploy from a branch**
4. Branch: **main** / Folder: **/ (root)**
5. Нажать **Save**

Через 1–3 минуты сайт будет доступен по адресу:
```
https://ВАШ_ЛОГИН.github.io/letterbot-ru/
```

---

### Шаг 4 — Подключить домен letterbot.ru (опционально)

Если хотите чтобы сайт открывался по `https://letterbot.ru`:

#### 4a. В GitHub Pages (Settings → Pages):
- В поле **Custom domain** введите `letterbot.ru`
- Нажать **Save**
- Поставить галку **Enforce HTTPS** (появится через несколько минут)

#### 4b. В DNS-панели вашего регистратора домена:

Добавить 4 A-записи (для apex-домена `letterbot.ru`):

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

И одну CNAME-запись (для www):

| Тип | Имя | Значение |
|-----|-----|----------|
| CNAME | www | ВАШ_ЛОГИН.github.io |

> DNS обновляется до 48 часов. GitHub сам выпустит SSL-сертификат через Let's Encrypt.

#### 4c. Файл CNAME

В репозитории уже есть файл `CNAME` с содержимым:
```
letterbot.ru
```
Этот файл говорит GitHub Pages какой домен обслуживать. **Не удалять.**

---

## Структура репозитория

```
/
├── index.html                  # Главная страница
├── vozmozhnosti.html           # Возможности
├── bezopasnost.html            # Безопасность и приватность
├── kak-rabotaet.html           # Как работает
├── komu-podhodit.html          # Кому подходит
├── dlya-inzhenerov.html        # Для инженеров (технический разбор)
├── faq.html                    # FAQ (40+ вопросов с поиском)
├── sravnenie.html              # Сравнение с конкурентами
├── ustanovka-windows.html      # Установка на Windows
├── podderzhka.html             # Поддержать проект
│
├── assets/
│   ├── config.js               # ← ВСЕ ССЫЛКИ И ВЕРСИЯ ЗДЕСЬ
│   ├── styles.css              # Стили
│   ├── main.js                 # Логика (FAQ-поиск, навигация, LB-ссылки)
│   ├── boosty_qr.svg           # QR-код для Boosty
│   ├── logo.svg                # Логотип
│   └── og.png                  # OG-картинка для соцсетей
│
├── blog/                       # Статьи (папка, можно добавлять)
├── CNAME                       # Домен для GitHub Pages
├── robots.txt                  # Для поисковиков
├── sitemap.xml                 # Карта сайта
└── site.webmanifest            # PWA-манифест
```

---

## Как обновить сайт

### Через браузер
1. Открыть файл в репозитории на GitHub
2. Нажать иконку карандаша ✏️ (Edit)
3. Внести изменения
4. Commit changes

### Через Git
```bash
# Внести изменения в файлы, затем:
git add .
git commit -m "Описание изменений"
git push
```

GitHub Pages автоматически пересобирает сайт после каждого push. Обновление занимает ~1 минуту.

---

## Как обновить версию или ссылки

**Все ссылки, версия и дата — только в одном файле:**

```
assets/config.js
```

Там лежит объект `window.LB`:

```js
window.LB = {
  version:  '28.0.0',      // ← версия LetterBot
  updated:  'март 2026',   // ← дата обновления
  github:   'https://github.com/SergioTheFirst/letterbot',
  releases: 'https://github.com/SergioTheFirst/letterbot/releases/latest',
  telegram: 'https://t.me/+1xHH6NwJONVlZTA6',
  boosty:   'https://boosty.to/personalbot/donate?qr=true',
  email:    'master@letterbot.ru',
  siteEn:   'https://sergiothefirst.github.io/letterbot/',
};
```

Менять только этот файл — все страницы подтянут данные автоматически через `data-lb-*` атрибуты.

---

## Проверить что сайт работает

После деплоя открыть:
- `https://ВАШ_ЛОГИН.github.io/letterbot-ru/` — главная
- `https://ВАШ_ЛОГИН.github.io/letterbot-ru/faq.html` — FAQ с поиском
- `https://ВАШ_ЛОГИН.github.io/letterbot-ru/dlya-inzhenerov.html` — для инженеров

Если что-то не загружается — проверить вкладку **Actions** в репозитории: там виден статус сборки GitHub Pages.

---

## Частые ошибки

| Проблема | Причина | Решение |
|----------|---------|---------|
| Страница 404 | Pages не включён | Settings → Pages → выбрать branch main |
| CSS не загружается | Неверный путь | Убедитесь что `assets/` в корне репо |
| Домен не работает | DNS не обновился | Подождать до 48 часов |
| HTTPS не работает | Нет CNAME или DNS | Проверить файл CNAME и DNS-записи |
| Сайт старый | Браузер кэш | Ctrl+Shift+R или очистить кэш |

---

## Добавить статью в блог

1. Создать файл `blog/название-статьи.html`
2. Скопировать структуру из существующей страницы (пути к CSS — `../assets/styles.css`)
3. Добавить ссылку в `sitemap.xml`
4. Закоммитить

---

*LetterBot — приватный оператор почты: локально, бесплатно, без подписки.*  
*master@letterbot.ru · https://t.me/+1xHH6NwJONVlZTA6*
