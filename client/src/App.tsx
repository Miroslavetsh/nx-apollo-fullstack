import { CreateUserForm } from "./components/CreateUserForm";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";

//TODO: Add updating a user functionality + adding/removing posts functionality

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
      </div>
    </div>
  );
}

export default App;
