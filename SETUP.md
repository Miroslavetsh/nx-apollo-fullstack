# Setup Instructions for Nx Monorepo

## Initial Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Generate GraphQL types:**
   ```bash
   pnpm graphql:codegen
   ```

## Project Structure

```
graphql-apollo-course/
├── client/          # React application
├── server/          # Express GraphQL server
├── shared/          # Shared types, schemas, validations
│   ├── src/
│   │   ├── types/           # TypeScript types
│   │   ├── validations/     # Zod schemas
│   │   ├── graphql/
│   │   │   ├── schema.graphql      # GraphQL schema
│   │   │   ├── operations/         # GraphQL queries/mutations
│   │   │   └── generated/          # Generated types and hooks
│   │   └── index.ts
│   └── codegen.yml          # GraphQL codegen config
└── api/            # API library (typed methods)

```

## Using Shared Library

### In Client:
```typescript
import { User, userSchema } from "@graphql-apollo-course/shared";
import { GET_ALL_USERS, CREATE_USER } from "@graphql-apollo-course/shared";
```

### In Server:
```typescript
import { schema } from "@graphql-apollo-course/shared/graphql/schema.server";
// or
import { schema } from "@graphql-apollo-course/shared/server";
import type { User, UserInput } from "@graphql-apollo-course/shared";
```

## GraphQL Code Generation (Optional)

GraphQL codegen is optional. If you want to generate TypeScript types and React hooks:

```bash
pnpm graphql:codegen
```

This will generate:
- TypeScript types for all GraphQL types
- React hooks for queries and mutations
- Type-safe operations

Generated files are in `shared/src/graphql/generated/` (gitignored)

**Note:** The project works without codegen - GraphQL operations are defined as gql strings in `shared/src/graphql/operations/`

## Development Workflow

1. Update GraphQL schema in `shared/src/graphql/schema.graphql`
2. Add operations in `shared/src/graphql/operations/`
3. Run `pnpm graphql:codegen` to generate types
4. Use generated hooks in client
5. Update server resolvers to match schema

## Debugging

Use VS Code debug configurations:
- "Debug Server" - Debug Express server
- "Debug Client" - Debug React app
- "Debug Full Stack" - Debug both simultaneously
