import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { UserAPI } from "@graphql-apollo-course/api";
import type { User, UserInput } from "@graphql-apollo-course/shared";

type UseUsersReturn = {
  // State
  users: User[];
  loading: boolean;
  error: Error | null;
  editingUserId: string | null;
  editingUser: User | null;

  // Actions
  loadUsers: () => Promise<void>;
  createUser: (user: UserInput) => Promise<void>;
  updateUser: (id: string, user: UserInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (id: string) => void;
  cancelEdit: () => void;

  // Debounced form submit
  debouncedSubmit: (values: Record<string, string>) => void;
};

/**
 * Custom hook for managing users CRUD operations
 * Includes debounced form submission
 */
export function useUsers(): UseUsersReturn {
  const client = useApolloClient();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Initialize UserAPI instance
  const userAPI = useMemo(() => new UserAPI(client), [client]);

  // Debounce timer ref
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userAPI.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load users"));
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }, [userAPI]);

  const createUser = useCallback(
    async (user: UserInput) => {
      setError(null);
      try {
        await userAPI.createUser(user);
        await loadUsers();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to create user")
        );
        console.error("Error creating user:", err);
        throw err;
      }
    },
    [userAPI, loadUsers]
  );

  const updateUser = useCallback(
    async (id: string, user: UserInput) => {
      setError(null);
      try {
        await userAPI.updateUser(id, user);
        setEditingUserId(null);
        await loadUsers();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update user")
        );
        console.error("Error updating user:", err);
        throw err;
      }
    },
    [userAPI, loadUsers]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        setError(null);
        try {
          await userAPI.deleteUser(id);
          await loadUsers();
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error("Failed to delete user")
          );
          console.error("Error deleting user:", err);
          throw err;
        }
      }
    },
    [userAPI, loadUsers]
  );

  const editUser = useCallback(
    (id: string) => {
      const user = users.find((u) => u.id === id);
      if (user) {
        setEditingUserId(id);
      }
    },
    [users]
  );

  const cancelEdit = useCallback(() => {
    setEditingUserId(null);
  }, []);

  // Debounced form submit function
  const debouncedSubmit = useCallback(
    (values: Record<string, string>) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const userInput: UserInput = {
            username: values.username,
            age: parseInt(values.age, 10),
          };

          if (editingUserId) {
            await updateUser(editingUserId, userInput);
          } else {
            await createUser(userInput);
          }
        } catch (err) {
          // Error is already handled in createUser/updateUser
          console.error("Error in debounced submit:", err);
        }
      }, 300); // 300ms debounce delay
    },
    [editingUserId, createUser, updateUser]
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Get editing user
  const editingUser = useMemo(() => {
    if (!editingUserId) return null;
    return users.find((u) => u.id === editingUserId) || null;
  }, [editingUserId, users]);

  return {
    users,
    loading,
    error,
    editingUserId,
    editingUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    editUser,
    cancelEdit,
    debouncedSubmit,
  };
}
