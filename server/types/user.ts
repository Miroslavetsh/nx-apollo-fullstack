import { ID } from "./common";
import { Post, PostInput } from "./post";

export interface User {
  id: ID;
  username: string;
  age: number;
  posts: Post[];
}

export interface UserInput {
  username: string;
  age: number;
  posts: PostInput[];
}
