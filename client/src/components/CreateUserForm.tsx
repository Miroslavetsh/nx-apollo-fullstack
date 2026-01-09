import { Form } from "./Form";
import { FormField } from "./FormField";
import { Button } from "./Button";
import { userSchema } from "../lib/validations";
import type { User } from "@graphql-apollo-course/shared";

export interface CreateUserFormProps {
  onSubmit: (values: Record<string, string>) => void;
  onGetAllUsers?: () => void | Promise<void>;
  editingUser?: User | null;
  onCancel?: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
  onGetAllUsers,
  editingUser,
  onCancel,
}) => {
  const initialValues: Record<string, string> = editingUser
    ? {
        username: editingUser.username,
        age: editingUser.age.toString(),
      }
    : {};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingUser ? "Edit User" : "Create User"}
      </h2>
      <Form
        onSubmit={onSubmit}
        schema={userSchema}
        initialValues={initialValues}
        className="space-y-4"
      >
        <FormField
          name="username"
          label="Username"
          placeholder="Enter username"
        />
        <FormField
          name="age"
          label="Age"
          type="number"
          placeholder="Enter age"
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary">
            {editingUser ? "Update User" : "Create User"}
          </Button>
          {editingUser && onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onGetAllUsers && !editingUser && (
            <Button type="button" variant="secondary" onClick={onGetAllUsers}>
              Get All Users
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
