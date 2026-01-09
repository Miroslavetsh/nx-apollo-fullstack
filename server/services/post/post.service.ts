import type { Post, PostInput } from "@graphql-apollo-course/shared";
import { posts } from "../../lib/data";

export const getAllUserPosts = (args: { userId: string }): Post[] => {
  return posts
    .filter((post) => post.userId === args.userId)
    .map(({ userId, ...post }) => post);
};

export const updatePost = (args: { id: string; post: PostInput }): Post => {
  const postIndex = posts.findIndex((post) => post.id === args.id);
  if (postIndex === -1) {
    throw new Error("Post not found");
  }
  const updatedPost: Post = {
    ...args.post,
    id: args.id,
  };
  posts[postIndex] = { ...updatedPost, userId: posts[postIndex].userId };
  return updatedPost;
};

export const deletePost = (args: { id: string }): Post => {
  const postIndex = posts.findIndex((post) => post.id === args.id);
  if (postIndex === -1) {
    throw new Error("Post not found");
  }
  const { userId, ...deletedPost } = posts[postIndex];
  posts.splice(postIndex, 1);
  return deletedPost;
};
