import {
  getAllPosts,
  getPostById,
  getAllUserPosts,
  createPost,
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
  getAllPosts,
  getPostById,
  getAllUserPosts,
  getUserById,
  createUser,
  createPost,
  updateUser,
  deleteUser,
  updatePost,
  deletePost,
};
