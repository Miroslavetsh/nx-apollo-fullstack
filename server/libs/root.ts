import { posts, users } from "./data";

export const root = {
  getAllUsers: () => {
    return users;
  },
  getUserById: (args: { id: string }) => {
    return users.find((user) => user.id === args.id);
  },
  getAllUserPosts: (args: { userId: string }) => {
    return posts.filter((post) => post.userId === args.userId);
  },
};
