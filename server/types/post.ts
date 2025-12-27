import { ID } from "./common";

export interface Post {
  id: ID;
  title: string;
  content: string;
  userId: ID;
}

export interface PostInput {
  title: string;
  content: string;
}

export interface PostInputWithUserId extends PostInput {
  userId: ID;
}
