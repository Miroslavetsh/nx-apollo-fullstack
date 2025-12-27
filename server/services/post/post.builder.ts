import { ID } from "../../types/common";
import { Post, PostInput, PostInputWithUserId } from "../../types/post";

export const appendUserIdToPost =
  (id: ID) =>
  (p: PostInput): PostInputWithUserId => ({ ...p, userId: id });

export const buildPost = (post: PostInputWithUserId): Post => ({
  ...post,
  id: Date.now(),
});
