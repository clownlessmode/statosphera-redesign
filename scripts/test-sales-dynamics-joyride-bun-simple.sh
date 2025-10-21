#!/bin/bash

# Скрипт для запуска автотестов SalesDynamicsJoyride через Bun
echo "🚀 Запуск автотестов для SalesDynamicsJoyride через Bun..."

# Проверяем наличие Bun
if ! command -v bun &> /dev/null; then
    echo "❌ Bun не найден. Установите Bun для запуска тестов."
    echo "📦 Установка Bun:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Проверяем наличие package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json не найден. Убедитесь, что вы находитесь в корне проекта."
    exit 1
fi

# Проверяем наличие тестовых файлов
test_files=(
    "src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-simple.test.ts"
    "src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-advanced.test.ts"
)

echo "🔍 Проверка наличия тестовых файлов..."
for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file найден"
    else
        echo "❌ $file не найден"
    fi
done

# Запускаем простые тесты
echo "🧪 Запуск простых тестов..."
bun test src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-simple.test.ts

# Проверяем результат
if [ $? -eq 0 ]; then
    echo "✅ Простые тесты прошли успешно!"
else
    echo "❌ Простые тесты не прошли. Проверьте вывод выше."
    exit 1
fi

# Запускаем продвинутые тесты
echo "🧪 Запуск продвинутых тестов..."
bun test src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-advanced.test.ts --ignore="**/*.test.tsx"

# Проверяем результат
if [ $? -eq 0 ]; then
    echo "✅ Продвинутые тесты прошли успешно!"
else
    echo "❌ Продвинутые тесты не прошли. Проверьте вывод выше."
    exit 1
fi

echo "🎉 Все тесты прошли успешно!"
