import type { User, Post } from "@graphql-apollo-course/shared";

// Internal type for posts with userId (not in GraphQL schema)
type PostWithUserId = Post & { userId: string };

export const users: User[] = [
  { id: "1", username: "John Doe", age: 20, posts: [] },
  { id: "2", username: "Jane Doe", age: 21, posts: [] },
  { id: "3", username: "Jim Beam", age: 22, posts: [] },
  { id: "4", username: "Jane Doe", age: 23, posts: [] },
  { id: "5", username: "Jim Beam", age: 24, posts: [] },
  { id: "6", username: "Jane Doe", age: 25, posts: [] },
  { id: "7", username: "Jim Beam", age: 26, posts: [] },
  { id: "8", username: "Jane Doe", age: 27, posts: [] },
  { id: "9", username: "Jim Beam", age: 28, posts: [] },
  { id: "10", username: "Jane Doe", age: 29, posts: [] },
];

export const posts: PostWithUserId[] = [
  { id: "1", title: "Post 1", content: "Content 1", userId: "1" },
  { id: "2", title: "Post 2", content: "Content 2", userId: "2" },
  { id: "3", title: "Post 3", content: "Content 3", userId: "1" },
  { id: "4", title: "Post 4", content: "Content 4", userId: "2" },
  { id: "5", title: "Post 5", content: "Content 5", userId: "1" },
  { id: "6", title: "Post 6", content: "Content 6", userId: "2" },
  { id: "7", title: "Post 7", content: "Content 7", userId: "1" },
  { id: "8", title: "Post 8", content: "Content 8", userId: "2" },
  { id: "9", title: "Post 9", content: "Content 9", userId: "1" },
  { id: "10", title: "Post 10", content: "Content 10", userId: "2" },
  { id: "11", title: "Post 11", content: "Content 11", userId: "1" },
  { id: "12", title: "Post 12", content: "Content 12", userId: "2" },
  { id: "13", title: "Post 13", content: "Content 13", userId: "1" },
  { id: "14", title: "Post 14", content: "Content 14", userId: "2" },
  { id: "15", title: "Post 15", content: "Content 15", userId: "1" },
  { id: "16", title: "Post 16", content: "Content 16", userId: "3" },
  { id: "17", title: "Post 17", content: "Content 17", userId: "4" },
  { id: "18", title: "Post 18", content: "Content 18", userId: "5" },
  { id: "19", title: "Post 19", content: "Content 19", userId: "6" },
  { id: "20", title: "Post 20", content: "Content 20", userId: "6" },
  { id: "21", title: "Post 20", content: "Content 20", userId: "7" },
  { id: "22", title: "Post 21", content: "Content 21", userId: "8" },
  { id: "23", title: "Post 22", content: "Content 22", userId: "9" },
  { id: "24", title: "Post 23", content: "Content 23", userId: "10" },
  { id: "25", title: "Post 24", content: "Content 24", userId: "4" },
];
