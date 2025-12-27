import { users } from "../../lib/data";
import { ID } from "../../types/common";

import { User, UserInput } from "../../types/user";
import { buildUserWithPosts } from "./user.builder";

export const getAllUsers = () => users;

export const getUserById = (args: { id: ID }) => {
  return users.find((user) => user.id === args.id);
};

export const createUser = (args: { user: UserInput }) => {
  const newUser = buildUserWithPosts(args.user);
  users.push(newUser);
  return newUser;
};
