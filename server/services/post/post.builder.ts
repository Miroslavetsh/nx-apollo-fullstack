import type {
  InputMaybe,
  Post,
  PostInput,
} from "@graphql-apollo-course/shared";

export interface PostInputWithUserId extends PostInput {
  userId: string;
}

export const appendUserIdToPost =
  (id: string) =>
  (p: InputMaybe<PostInput>): InputMaybe<PostInputWithUserId> => ({
    ...(p ?? {}),
    userId: id ?? "",
    content: p?.content ?? "",
    title: p?.title ?? "",
  });

export const buildPost = (
  post: InputMaybe<PostInputWithUserId>
): InputMaybe<Post> => ({
  ...(post ?? {}),
  content: post?.content ?? "",
  title: post?.title ?? "",
  id: Date.now().toString(),
});
