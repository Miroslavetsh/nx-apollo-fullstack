import type { User, UserInput } from "@graphql-apollo-course/shared";
import { appendUserIdToPost, buildPost } from "../post/post.builder";

export const buildUserWithPosts = (user: UserInput): User => {
  const id = Date.now().toString();

  const newUser: User = {
    ...user,
    posts: user.posts?.map(appendUserIdToPost(id)).map(buildPost) || [],
    id,
  };

  return newUser;
};
