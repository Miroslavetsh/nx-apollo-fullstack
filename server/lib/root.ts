import { getAllUserPosts } from "../services/post.service";
import { createUser, getAllUsers, getUserById } from "../services/user.service";

export const root = {
  getAllUsers,
  getAllUserPosts,
  getUserById,
  createUser,
};
