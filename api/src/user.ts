import { ApolloClient } from "@apollo/client";
import type { User, UserInput } from "@graphql-apollo-course/shared";
// Import generated hooks from shared when codegen is set up
// import { useGetAllUsersQuery, useCreateUserMutation } from "@graphql-apollo-course/shared/graphql/generated";

export class UserAPI {
  constructor(private client: ApolloClient) {}

  async getAllUsers(): Promise<User[]> {
    // Implementation will use generated queries
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async getUserById(id: string): Promise<User> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async createUser(user: UserInput): Promise<User> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async updateUser(id: string, user: UserInput): Promise<User> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }

  async deleteUser(id: string): Promise<User> {
    throw new Error(
      "Not implemented - use generated hooks from shared library"
    );
  }
}
