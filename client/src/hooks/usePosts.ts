import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { PostAPI } from "@graphql-apollo-course/api";
import type { Post, PostInput } from "@graphql-apollo-course/shared";
import { useToast } from "./useToast";

type UsePostsReturn = {
  // State
  posts: Post[];
  loading: boolean;
  error: Error | null;
  editingPostId: string | null;
  editingPost: Post | null;

  // Actions
  loadPosts: () => Promise<void>;
  loadUserPosts: (userId: string) => Promise<void>;
  createPost: (post: PostInput) => Promise<void>;
  updatePost: (id: string, post: PostInput) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  editPost: (id: string) => void;
  cancelEdit: () => void;

  // Debounced form submit
  debouncedSubmit: (values: Record<string, string>) => void;
};

/**
 * Custom hook for managing posts CRUD operations
 */
export function usePosts(): UsePostsReturn {
  const client = useApolloClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Initialize PostAPI instance
  const postAPI = useMemo(() => new PostAPI(client), [client]);

  // Initialize toast hook
  const { showSuccess, showError } = useToast();

  // Debounce timer ref
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await postAPI.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load posts";
      setError(new Error(errorMessage));
      showError(errorMessage);
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  }, [postAPI, showError]);

  const loadUserPosts = useCallback(
    async (userId: string) => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPosts = await postAPI.getAllUserPosts(userId);
        setPosts(fetchedPosts);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load user posts";
        setError(new Error(errorMessage));
        showError(errorMessage);
        console.error("Error loading user posts:", err);
      } finally {
        setLoading(false);
      }
    },
    [postAPI, showError]
  );

  const createPost = useCallback(
    async (post: PostInput) => {
      setError(null);
      try {
        await postAPI.createPost(post);
        await loadPosts();
        showSuccess("Post created successfully!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create post";
        setError(new Error(errorMessage));
        showError(errorMessage);
        console.error("Error creating post:", err);
        throw err;
      }
    },
    [postAPI, loadPosts, showSuccess, showError]
  );

  const updatePost = useCallback(
    async (id: string, post: PostInput) => {
      setError(null);
      try {
        await postAPI.updatePost(id, post);
        setEditingPostId(null);
        await loadPosts();
        showSuccess("Post updated successfully!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update post";
        setError(new Error(errorMessage));
        showError(errorMessage);
        console.error("Error updating post:", err);
        throw err;
      }
    },
    [postAPI, loadPosts, showSuccess, showError]
  );

  const deletePost = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        setError(null);
        try {
          await postAPI.deletePost(id);
          await loadPosts();
          showSuccess("Post deleted successfully!");
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to delete post";
          setError(new Error(errorMessage));
          showError(errorMessage);
          console.error("Error deleting post:", err);
          throw err;
        }
      }
    },
    [postAPI, loadPosts, showSuccess, showError]
  );

  const editPost = useCallback(
    (id: string) => {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setEditingPostId(id);
      }
    },
    [posts]
  );

  const cancelEdit = useCallback(() => {
    setEditingPostId(null);
  }, []);

  // Debounced form submit function
  const debouncedSubmit = useCallback(
    (values: Record<string, string>) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const postInput: PostInput = {
            title: values.title,
            content: values.content,
          };

          if (editingPostId) {
            await updatePost(editingPostId, postInput);
          } else {
            await createPost(postInput);
          }
        } catch (err) {
          // Error is already handled in create/update
          console.error("Error in debounced submit (posts):", err);
        }
      }, 300);
    },
    [editingPostId, createPost, updatePost]
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Get editing post
  const editingPost = useMemo(() => {
    if (!editingPostId) return null;
    return posts.find((p) => p.id === editingPostId) || null;
  }, [editingPostId, posts]);

  return {
    posts,
    loading,
    error,
    editingPostId,
    editingPost,
    loadPosts,
    loadUserPosts,
    createPost,
    updatePost,
    deletePost,
    editPost,
    cancelEdit,
    debouncedSubmit,
  };
}
