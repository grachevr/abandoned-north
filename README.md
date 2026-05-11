# БРОШЕНО — Заброшенные объекты Севера России

Информационный сайт с документацией заброшенных зданий и сооружений Крайнего Севера.

## Структура проекта

```
abandoned-north/
├── index.html              # Главная страница
├── css/
│   └── main.css            # Все стили + дизайн-система
├── js/
│   └── main.js             # Анимации, курсор, скролл-эффекты
└── pages/
    ├── murmansk.html        # Страница региона
    ├── murmansk-zavod35.html # Страница объекта
    ├── arkhangelsk.html
    ├── komi.html
    ├── karelia.html
    ├── nenets.html
    ├── vologda.html
    └── yamalo-nenets.html
```

## Деплой на GitHub Pages

### 1. Создайте репозиторий на GitHub
- Зайдите на [github.com](https://github.com) → New repository
- Название: `abandoned-north` (или любое другое)
- Видимость: **Public** (обязательно для бесплатного GitHub Pages)
- Не добавляйте README (он уже есть)

### 2. Загрузите файлы

```bash
cd abandoned-north
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/abandoned-north.git
git push -u origin main
```

### 3. Включите GitHub Pages
- Откройте репозиторий на GitHub
- Settings → Pages
- Source: **GitHub Actions**
- Сохраните

### 4. Готово!
Сайт будет доступен по адресу:
`https://ВАШ_ЛОГИН.github.io/abandoned-north/`

Первый деплой занимает ~2 минуты. Статус можно отслеживать во вкладке **Actions**.

---

## Как добавить реальные фотографии

В CSS файле все фоны объектов — тёмные градиенты. Чтобы добавить фото:

```css
/* В файле pages/murmansk.html добавьте: */
.obj-card-img.img-1 {
  background-image: url('../images/zavod35-main.jpg');
  background-size: cover;
  background-position: center;
}
```

Создайте папку `images/` и кладите фото туда.

## Как добавить новый регион

1. Скопируйте `pages/murmansk.html` → `pages/noviy-region.html`
2. Замените данные: название, объекты, даты
3. Добавьте карточку в `index.html` в секцию `.regions-grid`
4. Для каждого объекта скопируйте `pages/murmansk-zavod35.html`

## Как подключить реальную карту

Замените `.map-embed` блок на iframe Яндекс.Карт:

```html
<div class="map-embed" style="padding:0; overflow:hidden;">
  <iframe 
    src="https://yandex.ru/map-widget/v1/?ll=33.0857,69.0842&z=14&pt=33.0857,69.0842,pm2rdm"
    width="100%" height="100%" frameborder="0">
  </iframe>
</div>
```
