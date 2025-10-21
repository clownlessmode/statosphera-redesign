#!/bin/bash

# Скрипт для запуска автотестов SalesDynamicsJoyride
echo "🚀 Запуск автотестов для SalesDynamicsJoyride..."

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js для запуска тестов."
    exit 1
fi

# Проверяем наличие npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Установите npm для запуска тестов."
    exit 1
fi

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Запускаем тесты
echo "🧪 Запуск тестов..."
npm test -- --testPathPattern=sales-dynamics-joyride.test.tsx --verbose

# Проверяем результат
if [ $? -eq 0 ]; then
    echo "✅ Все тесты прошли успешно!"
else
    echo "❌ Некоторые тесты не прошли. Проверьте вывод выше."
    exit 1
fi
