import type { Post, PostInput } from "./post";

export type User = {
  id: string;
  username: string;
  age: number;
  posts?: Post[];
};

export type UserInput = {
  username: string;
  age: number;
  posts?: PostInput[];
};
