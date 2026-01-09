import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Exclude server-only files from client bundle
    },
  },
  optimizeDeps: {
    exclude: ["@graphql-apollo-course/shared/graphql/schema.server"],
  },
  ssr: {
    noExternal: ["@graphql-apollo-course/shared"],
  },
});
