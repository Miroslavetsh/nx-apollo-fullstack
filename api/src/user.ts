import { ApolloClient } from "@apollo/client";
import type {
  User,
  UserInput,
  GetAllUsersQuery,
  GetUserByIdQuery,
  CreateUserMutation,
  UpdateUserMutation,
  DeleteUserMutation,
} from "@graphql-apollo-course/shared";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
} from "@graphql-apollo-course/shared";
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "@graphql-apollo-course/shared";

export class UserAPI {
  constructor(private client: ApolloClient) {}

  async getAllUsers(): Promise<User[]> {
    const { data } = await this.client.query<GetAllUsersQuery>({
      query: GET_ALL_USERS,
      fetchPolicy: "network-only",
    });
    if (!data) {
      throw new Error("Failed to fetch users");
    }
    return data.getAllUsers;
  }

  async getUserById(id: string): Promise<User> {
    const { data } = await this.client.query<GetUserByIdQuery>({
      query: GET_USER_BY_ID,
      variables: { id },
      fetchPolicy: "network-only",
    });
    if (!data) {
      throw new Error("Failed to fetch user");
    }
    return data.getUserById;
  }

  async createUser(user: UserInput): Promise<User> {
    const { data } = await this.client.mutate<CreateUserMutation>({
      mutation: CREATE_USER,
      variables: { user },
    });
    if (!data?.createUser) {
      throw new Error("Failed to create user");
    }
    return data.createUser;
  }

  async updateUser(id: string, user: UserInput): Promise<User> {
    const { data } = await this.client.mutate<UpdateUserMutation>({
      mutation: UPDATE_USER,
      variables: { id, user },
    });
    if (!data?.updateUser) {
      throw new Error("Failed to update user");
    }
    return data.updateUser;
  }

  async deleteUser(id: string): Promise<User> {
    const { data } = await this.client.mutate<DeleteUserMutation>({
      mutation: DELETE_USER,
      variables: { id },
    });
    if (!data?.deleteUser) {
      throw new Error("Failed to delete user");
    }
    return data.deleteUser;
  }
}
