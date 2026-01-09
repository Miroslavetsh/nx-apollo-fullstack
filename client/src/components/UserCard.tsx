type UserCardProps = {
  id: string;
  username: string;
  age: number;
};

export function UserCard({ username, age }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{username}</h2>
      <p className="text-gray-600">Age: {age}</p>
    </div>
  );
}
