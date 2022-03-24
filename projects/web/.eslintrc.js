module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["eslint-plugin-import-helpers"],
  rules: {
      "import-helpers/order-imports": [
          "error",
          { // example configuration
              newlinesBetween: "always",
              groups: [
                  "module",
                  ["parent", "sibling", "index"],
              ],
              alphabetize: { order: "asc", ignoreCase: true },
          },
      ],
  }
}
