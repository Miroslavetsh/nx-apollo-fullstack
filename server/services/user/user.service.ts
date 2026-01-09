import { users } from "../../lib/data";
import type { UserInput } from "@graphql-apollo-course/shared";
import { buildUserWithPosts } from "./user.builder";

export const getAllUsers = () => users;

export const getUserById = (args: { id: string }) => {
  return users.find((user) => user.id === args.id);
};

export const createUser = (args: { user: UserInput }) => {
  const newUser = buildUserWithPosts(args.user);
  users.push(newUser);
  return newUser;
};

export const updateUser = (args: { id: string; user: UserInput }) => {
  const userIndex = users.findIndex((user) => user.id === args.id);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  const updatedUser = buildUserWithPosts(args.user);
  updatedUser.id = args.id;
  users[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteUser = (args: { id: string }) => {
  const userIndex = users.findIndex((user) => user.id === args.id);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  return deletedUser;
};
