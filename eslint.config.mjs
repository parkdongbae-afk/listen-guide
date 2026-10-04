import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // App Router의 layout <head>는 전 페이지에 적용되므로 이 규칙(pages 라우터용)은 적용하지 않는다.
    // Pretendard 변수 폰트는 CSS link로 로드해야 한다.
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
