import { Form } from "./Form";
import { FormField } from "./FormField";
import { Button } from "./Button";
import { userSchema } from "../lib/validations";

type CreateUserFormProps = {
  onSubmit: (values: Record<string, string>) => void;
  onGetAllUsers?: () => void;
};

export function CreateUserForm({
  onSubmit,
  onGetAllUsers,
}: CreateUserFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create User</h2>
      <Form onSubmit={onSubmit} schema={userSchema} className="space-y-4">
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
            Create User
          </Button>
          {onGetAllUsers && (
            <Button type="button" variant="secondary" onClick={onGetAllUsers}>
              Get All Users
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
