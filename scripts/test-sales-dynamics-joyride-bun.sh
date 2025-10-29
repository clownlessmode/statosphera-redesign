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

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей через Bun..."
    bun install
fi

# Проверяем наличие тестовых файлов
test_files=(
    "src/1_pages/sales-dynamics/ui/sales-dynamics-joyride.test.tsx"
    "src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-advanced.test.tsx"
    "src/1_pages/sales-dynamics/ui/sales-dynamics-joyride-realtime.test.tsx"
)

echo "🔍 Проверка наличия тестовых файлов..."
for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file найден"
    else
        echo "❌ $file не найден"
    fi
done

# Запускаем тесты через Bun
echo "🧪 Запуск тестов через Bun..."
echo "📋 Доступные команды:"
echo "  bun test -- --testPathPattern=sales-dynamics-joyride.test.tsx"
echo "  bun test -- --testPathPattern=sales-dynamics-joyride-advanced.test.tsx"
echo "  bun test -- --testPathPattern=sales-dynamics-joyride-realtime.test.tsx"
echo "  bun test -- --testPathPattern=sales-dynamics-joyride"
echo ""

# Запускаем все тесты SalesDynamicsJoyride
echo "🚀 Запуск всех тестов SalesDynamicsJoyride..."
bun test -- --testPathPattern=sales-dynamics-joyride --verbose

# Проверяем результат
if [ $? -eq 0 ]; then
    echo "✅ Все тесты прошли успешно!"
else
    echo "❌ Некоторые тесты не прошли. Проверьте вывод выше."
    exit 1
fi


