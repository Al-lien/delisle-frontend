import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["dist/", "node_modules/", "**/allstation.ts", "**/server.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-useless-constructor": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { args: "none", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          ignoredMethodNames: [
            "ngOnInit",
            "ngAfterViewInit",
            "ngOnChanges",
            "ngOnDestroy",
            "ngAfterContentInit",
          ],
          overrides: {
            constructors: "off",
            accessors: "off",
          },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
];
