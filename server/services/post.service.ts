import { posts } from "../lib/data";
import { ID } from "../types/common";

export const getAllUserPosts = (args: { userId: ID }) => {
  return posts.filter((post) => post.userId === args.userId);
};
