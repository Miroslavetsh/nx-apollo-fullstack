# GraphQL Apollo Course - Nx Monorepo

This is an Nx monorepo containing a GraphQL server and React client application.

## Structure

- `client/` - React application with Vite
- `server/` - Express GraphQL server
- `shared/` - Shared types, GraphQL schemas, and validations
- `api/` - API library with typed methods

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

Run both client and server:
```bash
pnpm dev
```

Run only client:
```bash
pnpm dev:client
```

Run only server:
```bash
pnpm dev:server
```

### Generate GraphQL Types

```bash
pnpm graphql:codegen
```

### Build

```bash
pnpm build
```

## Shared Library

The `shared` library contains:
- TypeScript types for User and Post
- Zod validation schemas
- GraphQL schema definitions
- Generated GraphQL operations and hooks

## API Library

The `api` library provides typed API methods based on the GraphQL schema. Methods will be generated from the shared GraphQL operations.
