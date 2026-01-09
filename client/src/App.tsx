import { useEffect, useState } from "react";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER, UPDATE_USER, DELETE_USER } from "./mutations/user";
import { useQuery, useMutation } from "@apollo/client/react";
import { CreateUserForm } from "./components/CreateUserForm";
import { UsersList } from "./components/UsersList";

// TODO: Make shared types microservice and use them in both client and server using nx + add shared types, schemas and graphql files to nx monorepo
// TODO add api lib where add the realization of api methods using server app as the definitions for all the available operations + add client codegen script to nx using best practice
// TODO: Make best practice for graphql using schema separation
//TODO: Make custom hook for user form (CRUD operations + mutations + handler functions)
// TODO: Add toaster for errors and success messages + add emitting of success and error messages to custom hook for user form

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState<any[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  useEffect(() => {
    if (!loading && data) {
      // @ts-ignore
      const allUsers = data.getAllUsers;
      if (allUsers) {
        setUsers(allUsers);
      }
    }
  }, [data, loading]);

  const handleFormSubmit = async (values: Record<string, string>) => {
    try {
      if (editingUserId) {
        // Update existing user
        await updateUser({
          variables: {
            id: editingUserId,
            user: {
              username: values.username,
              age: parseInt(values.age, 10),
            },
          },
        });
        setEditingUserId(null);
      } else {
        // Create new user
        await createUser({
          variables: {
            user: {
              username: values.username,
              age: parseInt(values.age, 10),
            },
          },
        });
      }
      // Refetch will happen automatically due to refetchQueries
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleGetAllUsers = () => {
    refetch();
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
        await deleteUser({
          variables: { id },
        });
        // Refetch will happen automatically due to refetchQueries
      } catch (err) {
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
