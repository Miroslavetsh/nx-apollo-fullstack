import { Button } from "./Button";

type UserCardProps = {
  id: string;
  username: string;
  age: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function UserCard({
  id,
  username,
  age,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{username}</h2>
      <p className="text-gray-600 mb-4">Age: {age}</p>
      <div className="flex gap-2">
        {onEdit && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onEdit(id)}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
