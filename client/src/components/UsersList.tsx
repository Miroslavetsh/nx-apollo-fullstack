import { UserCard } from "./UserCard";

type User = {
  id: string;
  username: string;
  age: number;
};

type UsersListProps = {
  users: User[];
  loading?: boolean;
  error?: Error | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function UsersList({
  users,
  loading,
  error,
  onEdit,
  onDelete,
}: UsersListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Users List</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-600">No users found</p>
      )}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              age={user.age}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
