import { useEffect, useState } from "react";
import { GET_ALL_USERS } from "./query/user";
import { useQuery } from "@apollo/client/react";
import { CreateUserForm } from "./components/CreateUserForm";
import { UsersList } from "./components/UsersList";

// TODO: Add form validation react-hook-form + zod
// Make shared types microservice and use them in both client and server using nx

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && data) {
      // @ts-ignore
      const allUsers = data.getAllUsers;
      if (allUsers) {
        setUsers(allUsers);
      }
    }
  }, [data, loading]);

  const handleFormSubmit = (values: Record<string, string>) => {
    console.log("Form submitted with values:", values);
    // TODO: Implement mutation to create user
  };

  const handleGetAllUsers = () => {
    // Refetch users
    // TODO: Implement refetch logic
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

        <UsersList users={users} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
