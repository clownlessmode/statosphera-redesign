import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Правила для импортов
      "import/no-relative-parent-imports": "error", // Запрещает импорты вида '../'
      "import/no-unresolved": "error", // Проверяет, что импорты разрешаются
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./*", "../*"],
          message:
            'Используйте абсолютные импорты с префиксами "@features/", "@shared/" и т.д. вместо относительных путей.',
        },
      ],
      "import/no-relative-parent-imports": "error",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  }
);
