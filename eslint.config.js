import { plugin } from "./eslintrc.js";

export default [
  ...plugin,
  {
    ignores: ["**/node_modules/**", "web-build/**", "dist/**", ".expo/**", ".expo-shared/**"]
  }
];