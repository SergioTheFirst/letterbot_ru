# LetterBot RU — сайт на GitHub Pages

Русскоязычный сайт LetterBot. Хостится на GitHub Pages с кастомным доменом `letterbot.ru`.

---

## Быстрый старт: залить на GitHub и включить Pages

### 1. Создать репозиторий на GitHub

1. Зайдите на [github.com/new](https://github.com/new)
2. **Repository name:** `letterbot-ru` (или любое другое)
3. Visibility: **Public** (GitHub Pages бесплатен только для публичных репо)
4. Галочку «Add a README file» **не ставить** — файлы уже есть
5. Нажать **Create repository**

### 2. Загрузить файлы сайта

Вариант A — через командную строку (Git):

```bash
# В папке с распакованным сайтом
git init
git add .
git commit -m "LetterBot RU v3 — initial deploy"
git branch -M main
git remote add origin https://github.com/ВАШ_НИК/letterbot-ru.git
git push -u origin main
```

Вариант B — через веб-интерфейс GitHub:
1. Откройте репозиторий → кнопка **Add file → Upload files**
2. Перетащите все файлы и папку `assets/` целиком
3. Commit changes

**Структура должна выглядеть так в корне репозитория:**
```
/
├── assets/
│   ├── config.js        ← все ссылки только здесь
│   ├── styles.css
│   ├── main.js
│   ├── boosty_qr.svg
│   ├── logo.svg
│   └── og.png
├── index.html
├── faq.html
├── dlya-inzhenerov.html
├── vozmozhnosti.html
├── bezopasnost.html
├── kak-rabotaet.html
├── komu-podhodit.html
├── sravnenie.html
├── ustanovka-windows.html
├── podderzhka.html
├── favicon.svg
├── CNAME                ← если используете свой домен
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

### 3. Включить GitHub Pages

1. Репозиторий → **Settings** (вверхний таб)
2. Слева: **Pages**
3. **Source:** `Deploy from a branch`
4. **Branch:** `main` / `/ (root)`
5. Нажать **Save**

Через 1–3 минуты сайт будет доступен по адресу:
```
https://ВАШ_НИК.github.io/letterbot-ru/
```

---

## Подключить свой домен (letterbot.ru)

### Шаг 1 — добавить CNAME-файл в репозиторий

В корне репо должен быть файл `CNAME` (без расширения) с одной строкой:
```
letterbot.ru
```

Он уже включён в поставку. Убедитесь, что он загружен.

### Шаг 2 — настроить DNS у регистратора домена

Зайдите в панель управления DNS вашего домена и добавьте записи:

| Тип   | Имя | Значение              |
|-------|-----|-----------------------|
| A     | @   | `185.199.108.153`     |
| A     | @   | `185.199.109.153`     |
| A     | @   | `185.199.110.153`     |
| A     | @   | `185.199.111.153`     |
| CNAME | www | `ВАШ_НИК.github.io`  |

> DNS-изменения применяются от нескольких минут до 24 часов (обычно ~30 минут).

### Шаг 3 — включить кастомный домен в GitHub

1. Settings → Pages → **Custom domain**
2. Введите `letterbot.ru`
3. Нажать **Save**
4. Поставить галочку **Enforce HTTPS** (после того как сертификат выдан — появится автоматически)

### Шаг 4 — проверить

```
https://letterbot.ru/
https://letterbot.ru/faq.html
```

---

## Обновлять сайт

Все ссылки, версия и дата — **только в `assets/config.js`**. Больше нигде.

```js
window.LB = {
  version:  '28.0.0',    // ← обновить при новом релизе
  updated:  'март 2026', // ← обновить месяц
  github:   'https://github.com/SergioTheFirst/letterbot',
  releases: 'https://github.com/SergioTheFirst/letterbot/releases/latest',
  boosty:   'https://boosty.to/personalbot/donate?qr=true',
  telegram: 'https://t.me/+1xHH6NwJONVlZTA6',
  email:    'master@letterbot.ru',
  siteRu:   'https://letterbot.ru/',
  siteEn:   'https://sergiothefirst.github.io/letterbot/',
};
```

После правки — сделать commit и push. GitHub Pages обновится автоматически через ~1 минуту.

---

## Чеклист перед запуском

- [ ] Все HTML-файлы загружены в корень репозитория
- [ ] Папка `assets/` загружена целиком (styles.css, main.js, config.js, boosty_qr.svg, og.png, logo.svg)
- [ ] `favicon.svg` в корне
- [ ] `CNAME` в корне (содержит `letterbot.ru`)
- [ ] `robots.txt` в корне
- [ ] `sitemap.xml` в корне
- [ ] `site.webmanifest` в корне
- [ ] В `assets/config.js` прописаны правильные ссылки на GitHub, Telegram, Boosty
- [ ] GitHub Pages включён (Settings → Pages → Source: main / root)
- [ ] DNS-записи A и CNAME добавлены у регистратора
- [ ] Custom domain прописан в Settings → Pages
- [ ] HTTPS включён (Enforce HTTPS)
- [ ] Проверить сайт: `https://letterbot.ru/` открывается
- [ ] Проверить `https://letterbot.ru/faq.html` — поиск работает
- [ ] Проверить `https://letterbot.ru/dlya-inzhenerov.html`

---

## Страницы сайта (10)

| Файл | Описание |
|------|----------|
| `index.html` | Главная: Hero, Telegram-мок, сравнение, FAQ-блок, Boosty-донат |
| `faq.html` | 40+ вопросов по 5 разделам, живой поиск, аккордеон |
| `dlya-inzhenerov.html` | Полный технический разбор: архитектура, Priority v2, degradation, логи |
| `vozmozhnosti.html` | 30 реальных особенностей по группам |
| `bezopasnost.html` | Приватность и данные: local-first, нулевая телеметрия |
| `kak-rabotaet.html` | Цепочка от IMAP до Telegram, 8 шагов |
| `komu-podhodit.html` | Сценарии использования: фрилансер, малый бизнес, инженер |
| `sravnenie.html` | Таблица vs Superhuman, Shortwave, Gmail AI, Spark |
| `ustanovka-windows.html` | Пошаговая установка на Windows 10/11 |
| `podderzhka.html` | Донат через Boosty с QR-кодом |

---

## Принципы AEO (AI Engine Optimization)

Применены по рекомендациям [vc.ru/ai/2758129](https://vc.ru/ai/2758129-kak-vyvesti-sait-v-top-3-rekomendatsiy-neyrosetey):

1. **Q&A-first:** каждый раздел начинается с вопроса, ответ — в первом предложении
2. **FAQPage JSON-LD:** на `index.html` и `faq.html` с 10+ вопросами
3. **SoftwareApplication JSON-LD:** на главной с версией, датой, ценой (0 ₽)
4. **Прямые ответы:** FAQ построен так, что нейросети берут ответ из первого предложения
5. **Reason codes в тексте:** `PRIO_DEADLINE_1D`, `DEGRADED_NO_LLM` — уникальные термины продукта
6. **Честное сравнение:** включает когда LetterBot НЕ подходит
7. **Слоган как якорная фраза:** «приватный оператор почты: локально, бесплатно, без подписки» повторяется везде
8. **Технический контент:** страница для инженеров с реальными логами и кодами событий

---

## Что НЕ входит (добавить вручную при необходимости)

- **`og.png`** — OpenGraph-изображение уже в `assets/og.png` (взято из предыдущей версии). Если нужно новое — размер 1200×630 px.
- **Google Analytics / Яндекс.Метрика** — намеренно не добавлены (нулевая телеметрия по концепции). Если хотите добавить — вставьте скрипт в `<head>` каждого HTML-файла или используйте GitHub Pages Analytics.
- **Блог** (`blog/` папка) — структура готова, файлов нет. Добавьте статьи аналогично английской версии.
- **`404.html`** — страница ошибки не включена в этот бандл. Создайте по образцу английской версии.
- **Changelog** — нет страницы с историей версий. Можно добавить `changelog.html`.

---

## Контакт

- Email: [master@letterbot.ru](mailto:master@letterbot.ru)
- Telegram-канал: [t.me/+1xHH6NwJONVlZTA6](https://t.me/+1xHH6NwJONVlZTA6)
- GitHub: [github.com/SergioTheFirst/letterbot](https://github.com/SergioTheFirst/letterbot)
