import { PostCard } from "./PostCard";
import type { Post } from "@graphql-apollo-course/shared";

type PostsListProps = {
  posts: Post[];
  loading?: boolean;
  error?: Error | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function PostsList({
  posts,
  loading,
  error,
  onEdit,
  onDelete,
}: PostsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-600">No posts found</p>
      )}
      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
