import type { Post, PostInput } from "@graphql-apollo-course/shared";
import { posts, users } from "../../lib/data";

export const getAllPosts = (): Post[] => {
  return posts.map(({ userId, ...post }) => post);
};

export const getPostById = (args: { id: string }): Post => {
  const post = posts.find((p) => p.id === args.id);
  if (!post) {
    throw new Error("Post not found");
  }
  const { userId, ...rest } = post;
  return rest;
};

export const getAllUserPosts = (args: { userId: string }): Post[] => {
  return posts
    .filter((post) => post.userId === args.userId)
    .map(({ userId, ...post }) => post);
};

export const createPost = (args: { post: PostInput }): Post => {
  const newId = (posts.length + 1).toString();
  // Attach to first user by default (schema doesn't include userId)
  const fallbackUserId = users[0]?.id ?? "1";
  const newPost = { id: newId, ...args.post };
  posts.push({ ...newPost, userId: fallbackUserId });
  return newPost;
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
