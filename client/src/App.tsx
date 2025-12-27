import "./App.css";
import { useEffect, useState } from "react";
import { GET_ALL_USERS } from "./query/user";
import { useQuery } from "@apollo/client/react";

// TODO: Separate components to support multi forms
// Connect Tailwind CSS to the project
// Add form validation react-hook-form + zod
// Make shared types microservice and use them in both client and server

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    //@ts-ignore
    if (!loading) setUsers(data.getAllUsers);
  }, [data]);

  return (
    <div>
      <form action="">
        <input type="text" />
        <input type="text" />
        <input type="text" />

        <div>
          <button type="submit">Create User</button>
          <button type="submit">Get All Users</button>
        </div>
      </form>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.username}</h2>
            <p>{user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
