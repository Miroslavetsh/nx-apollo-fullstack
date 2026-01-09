import { Button } from "./Button";

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function PostCard({
  id,
  title,
  content,
  onEdit,
  onDelete,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{content}</p>
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
