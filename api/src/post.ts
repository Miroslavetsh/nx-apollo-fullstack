import { ApolloClient } from "@apollo/client";
import type {
  Post,
  PostInput,
  GetAllPostsQuery,
  GetPostByIdQuery,
  GetAllUserPostsQuery,
  CreatePostMutation,
  UpdatePostMutation,
  DeletePostMutation,
} from "@graphql-apollo-course/shared";
import {
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_ALL_USER_POSTS,
} from "@graphql-apollo-course/shared";
import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "@graphql-apollo-course/shared";

export class PostAPI {
  constructor(private client: ApolloClient) {}

  async getAllPosts(): Promise<Post[]> {
    const { data } = await this.client.query<GetAllPostsQuery>({
      query: GET_ALL_POSTS,
      fetchPolicy: "network-only",
    });
    if (!data) {
      throw new Error("Failed to fetch posts");
    }
    return data.getAllPosts;
  }

  async getPostById(id: string): Promise<Post> {
    const { data } = await this.client.query<GetPostByIdQuery>({
      query: GET_POST_BY_ID,
      variables: { id },
      fetchPolicy: "network-only",
    });
    if (!data) {
      throw new Error("Failed to fetch post");
    }
    return data.getPostById;
  }

  async getAllUserPosts(userId: string): Promise<Post[]> {
    const { data } = await this.client.query<GetAllUserPostsQuery>({
      query: GET_ALL_USER_POSTS,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    if (!data) {
      throw new Error("Failed to fetch user posts");
    }
    return data.getAllUserPosts;
  }

  async createPost(post: PostInput): Promise<Post> {
    const { data } = await this.client.mutate<CreatePostMutation>({
      mutation: CREATE_POST,
      variables: { post },
    });
    if (!data?.createPost) {
      throw new Error("Failed to create post");
    }
    return data.createPost;
  }

  async updatePost(id: string, post: PostInput): Promise<Post> {
    const { data } = await this.client.mutate<UpdatePostMutation>({
      mutation: UPDATE_POST,
      variables: { id, post },
    });
    if (!data?.updatePost) {
      throw new Error("Failed to update post");
    }
    return data.updatePost;
  }

  async deletePost(id: string): Promise<Post> {
    const { data } = await this.client.mutate<DeletePostMutation>({
      mutation: DELETE_POST,
      variables: { id },
    });
    if (!data?.deletePost) {
      throw new Error("Failed to delete post");
    }
    return data.deletePost;
  }
}
