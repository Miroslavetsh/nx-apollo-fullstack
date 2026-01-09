import {
  getAllUserPosts,
  updatePost,
  deletePost,
} from "../services/post/post.service";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user/user.service";

export const root = {
  getAllUsers,
  getAllUserPosts,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePost,
  deletePost,
};
