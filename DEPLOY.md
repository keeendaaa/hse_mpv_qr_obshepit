# Инструкция по деплою на Vercel

## Проблемы и решения

### 1. Проблема с папкой сборки
**Проблема:** Vercel искал папку `dist`, но Vite создает папку `build`.

**Решение:** Создан файл `vercel.json` с правильной конфигурацией:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Проблема с изображениями меню
**Проблема:** Изображения загружались с внешних URL.

**Решение:** 
- Скачаны все изображения локально в `public/assets/images/`
- Пути в коде обновлены с внешних URL на `/assets/images/`

### 3. Проблема с изображением в футере
**Проблема:** Изображение не отображалось после деплоя.

**Решение:** 
- Изображение скопировано в `public/footer-image.png`
- Путь изменен с `/footer-image.png` на `./footer-image.png`

### 4. Добавлена аналитика
**Добавлено:** Vercel Analytics для отслеживания посещений:
```jsx
import { Analytics } from '@vercel/analytics/react';
// ...
<Analytics />
```

## Результат
- ✅ Сборка проходит успешно
- ✅ Папка `build` создается корректно
- ✅ Все изображения включены в сборку
- ✅ Vercel найдет правильную папку для деплоя
- ✅ Изображения корректно отображаются в продакшене
- ✅ Аналитика настроена

## Команды для деплоя
```bash
npm run build  # Локальная проверка сборки
git add .
git commit -m "Fix deployment: add analytics, fix image paths"
git push origin main
```
