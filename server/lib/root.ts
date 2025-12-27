import { getAllUserPosts } from "../services/post/post.service";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../services/user/user.service";

export const root = {
  getAllUsers,
  getAllUserPosts,
  getUserById,
  createUser,
};
