import { Form } from "./Form";
import { FormField } from "./FormField";
import { Button } from "./Button";
import { postSchema } from "@graphql-apollo-course/shared";
import type { Post } from "@graphql-apollo-course/shared";

export type CreatePostFormProps = {
  onSubmit: (values: Record<string, string>) => void;
  editingPost?: Post | null;
  onCancel?: () => void;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onSubmit,
  editingPost,
  onCancel,
}) => {
  const initialValues: Record<string, string> = editingPost
    ? {
        title: editingPost.title,
        content: editingPost.content,
      }
    : {};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingPost ? "Edit Post" : "Create Post"}
      </h2>
      <Form
        onSubmit={onSubmit}
        schema={postSchema}
        initialValues={initialValues}
        className="space-y-4"
      >
        <FormField name="title" label="Title" placeholder="Enter post title" />
        <FormField
          name="content"
          label="Content"
          placeholder="Enter post content"
          type="textarea"
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary">
            {editingPost ? "Update Post" : "Create Post"}
          </Button>
          {editingPost && onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
