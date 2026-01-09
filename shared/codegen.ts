import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql",
  documents: "./src/graphql/operations/**/*.{ts,graphql}",
  generates: {
    "./src/graphql/generated/index.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: false,
        addDocBlocks: true,
        dedupeOperationSuffix: true,
        onlyOperationTypes: false,
        avoidOptionals: false,
        scalars: {
          ID: "string",
        },
      },
    },
  },
};

export default config;
