import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    age: Int!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input UserInput {
    username: String!
    age: Int!
    posts: [PostInput]
  }

  input PostInput {
    title: String!
    content: String!
  }

  type Query {
    getAllUsers: [User!]!
    
    getUserById(id: ID!): User!
    getAllUserPosts(userId: ID!): [Post!]!
    
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post!
  }
`);
