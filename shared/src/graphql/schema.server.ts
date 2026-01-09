import { readFileSync } from "fs";
import { join } from "path";
import { buildSchema } from "graphql";

// Use __dirname for Node.js runtime
const schemaPath = join(__dirname, "schema.graphql");
let schemaString: string;

try {
  schemaString = readFileSync(schemaPath, "utf-8");
} catch (error) {
  // Fallback for different build environments
  const altPath = join(process.cwd(), "shared/src/graphql/schema.graphql");
  schemaString = readFileSync(altPath, "utf-8");
}

export const schema = buildSchema(schemaString);
