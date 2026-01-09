import { ApolloClient } from "@apollo/client";
import type { Post, PostInput } from "@graphql-apollo-course/shared";

export class PostAPI {
  constructor(private client: ApolloClient) {}

  async getAllPosts(): Promise<Post[]> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async getPostById(id: string): Promise<Post> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async createPost(post: PostInput): Promise<Post> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async updatePost(id: string, post: PostInput): Promise<Post> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async deletePost(id: string): Promise<Post> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }
}
