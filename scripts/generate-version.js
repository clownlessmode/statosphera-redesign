#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Получаем короткий хеш коммита
  const commitHash = execSync("git rev-parse --short HEAD", {
    encoding: "utf8",
  }).trim();

  // Получаем дату коммита
  const commitDate = execSync("git log -1 --format=%ci", {
    encoding: "utf8",
  }).trim();
  const date = new Date(commitDate);
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

  // Получаем количество коммитов
  const commitCount = execSync("git rev-list --count HEAD", {
    encoding: "utf8",
  }).trim();

  // Получаем текущую ветку
  const branch = execSync("git branch --show-current", {
    encoding: "utf8",
  }).trim();

  // Формируем версию: major.minor.patch-commitCount-commitHash
  const version = `1.0.${commitCount}-${commitHash}`;

  // Создаем объект с информацией о версии
  const versionInfo = {
    version,
    commitHash,
    commitDate: formattedDate,
    commitCount,
    branch,
    buildDate: new Date().toISOString().split("T")[0],
  };

  // Путь к файлу конфигурации
  const configPath = path.join(
    __dirname,
    "..",
    "src",
    "5_shared",
    "constants",
    "config.ts"
  );

  // Читаем текущий файл
  let configContent = fs.readFileSync(configPath, "utf8");

  // Заменяем константу VERSION
  configContent = configContent.replace(
    /export const VERSION = ".*";/,
    `export const VERSION = "${version}";`
  );

  // Добавляем дополнительную информацию о версии
  const versionInfoExport = `
export const VERSION_INFO = ${JSON.stringify(versionInfo, null, 2)};`;

  // Если VERSION_INFO еще нет, добавляем его
  if (!configContent.includes("VERSION_INFO")) {
    configContent += versionInfoExport;
  } else {
    // Заменяем существующий VERSION_INFO
    configContent = configContent.replace(
      /export const VERSION_INFO = \{[\s\S]*?\};/,
      versionInfoExport.trim()
    );
  }

  // Записываем обновленный файл
  fs.writeFileSync(configPath, configContent);

  console.log(`✅ Версия обновлена: ${version}`);
  console.log(`📅 Дата коммита: ${formattedDate}`);
  console.log(`🌿 Ветка: ${branch}`);
  console.log(`🔢 Количество коммитов: ${commitCount}`);
} catch (error) {
  console.error("❌ Ошибка при генерации версии:", error.message);
  process.exit(1);
}
