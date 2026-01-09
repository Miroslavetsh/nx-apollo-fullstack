import { useEffect } from "react";
import { CreateUserForm } from "./components/CreateUserForm";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";
import { CreatePostForm } from "./components/CreatePostForm";
import { PostsList } from "./components/PostsList";
import { usePosts } from "./hooks/usePosts";

// Posts management added via usePosts

function App() {
  const {
    users,
    loading,
    error,
    editingUser,
    loadUsers,
    editUser,
    deleteUser,
    cancelEdit,
    debouncedSubmit,
  } = useUsers();

  const {
    posts,
    loading: postsLoading,
    error: postsError,
    editingPost,
    loadPosts,
    editPost,
    deletePost,
    cancelEdit: cancelPostEdit,
    debouncedSubmit: debouncedSubmitPost,
  } = usePosts();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          User Management
        </h1>

        <CreateUserForm
          onSubmit={debouncedSubmit}
          onGetAllUsers={loadUsers}
          editingUser={editingUser}
          onCancel={cancelEdit}
        />

        <UsersList
          users={users}
          loading={loading}
          error={error}
          onEdit={editUser}
          onDelete={deleteUser}
        />

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>

          <CreatePostForm
            onSubmit={debouncedSubmitPost}
            editingPost={editingPost}
            onCancel={cancelPostEdit}
          />

          <PostsList
            posts={posts}
            loading={postsLoading}
            error={postsError}
            onEdit={editPost}
            onDelete={deletePost}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
