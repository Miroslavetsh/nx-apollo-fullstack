import { users } from "../lib/data";
import { ID } from "../types/common";

import { UserInput } from "../types/user";

export const getAllUsers = () => users;

export const getUserById = (args: { id: ID }) => {
  return users.find((user) => user.id === args.id);
};

export const createUser = (args: { user: UserInput }) => {
  const newUser = { ...args.user, id: Date.now(), posts: [] };
  users.push(newUser);
  return newUser;
};
