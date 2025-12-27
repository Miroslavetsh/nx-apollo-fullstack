import { ID } from "./common";
import { User } from "./user";

export interface Post {
  id: ID;
  title: string;
  content: string;
  userId: ID;
}

export interface PostInput {
  title: string;
  content: string;
  userId: ID;
}
