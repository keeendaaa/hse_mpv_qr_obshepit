# Инструкция по деплою на Vercel

## Проблема
Vercel искал папку `dist`, но Vite создает папку `build`.

## Решение
1. Создан файл `vercel.json` с правильной конфигурацией:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "build",
     "framework": "vite"
   }
   ```

2. Изображения скопированы в папку `public/assets/images/` для корректной работы в продакшене

3. Пути к изображениям в коде обновлены с `/src/assets/images/` на `/assets/images/`

## Результат
- ✅ Сборка проходит успешно
- ✅ Папка `build` создается корректно
- ✅ Изображения включены в сборку
- ✅ Vercel теперь найдет правильную папку для деплоя

## Команды для деплоя
```bash
npm run build  # Локальная проверка сборки
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```
