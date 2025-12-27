import { User, UserInput } from "../../types/user";
import { appendUserIdToPost, buildPost } from "../post/post.builder";

export const buildUserWithPosts = (user: UserInput): User => {
  const id = Date.now();

  const newUser = {
    ...user,
    posts: user.posts.map(appendUserIdToPost(id)).map(buildPost),
    id,
  };

  return newUser;
};
