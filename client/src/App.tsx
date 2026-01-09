import { useEffect, useState, useMemo } from "react";
import { useApolloClient } from "@apollo/client/react";
import { CreateUserForm } from "./components/CreateUserForm";
import { UsersList } from "./components/UsersList";
import { UserAPI } from "@graphql-apollo-course/api";
import type { User } from "@graphql-apollo-course/shared";

//TODO: Make custom hook for user form (CRUD operations + mutations + handler functions) + debounce function for form submission
// TODO: Add toaster for errors and success messages + add emitting of success and error messages to custom hook for user form
//TODO: Add updating a user functionality + adding/removing posts functionality

function App() {
  const client = useApolloClient();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Initialize UserAPI instance
  const userAPI = useMemo(() => new UserAPI(client), [client]);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userAPI.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load users"));
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values: Record<string, string>) => {
    try {
      setError(null);
      if (editingUserId) {
        // Update existing user
        await userAPI.updateUser(editingUserId, {
          username: values.username,
          age: parseInt(values.age, 10),
        });
        setEditingUserId(null);
      } else {
        // Create new user
        await userAPI.createUser({
          username: values.username,
          age: parseInt(values.age, 10),
        });
      }
      // Reload users after mutation
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to save user"));
      console.error("Error saving user:", err);
    }
  };

  const handleGetAllUsers = () => {
    loadUsers();
  };

  const handleEditUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingUserId(id);
      // TODO: Pre-fill form with user data
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setError(null);
        await userAPI.deleteUser(id);
        // Reload users after deletion
        await loadUsers();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to delete user")
        );
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          User Management
        </h1>

        <CreateUserForm
          onSubmit={handleFormSubmit}
          onGetAllUsers={handleGetAllUsers}
        />

        <UsersList
          users={users}
          loading={loading}
          error={error}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default App;
