import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Post } from "@shared/routes";
import { z } from "zod";

// Valid filters for listing posts
type PostFilters = {
  topic?: string;
  difficulty?: string;
  search?: string;
};

// Hook for fetching all posts with optional filters
export function usePosts(filters?: PostFilters) {
  // Construct query key based on filters to ensure caching works correctly
  const queryKey = [api.posts.list.path, filters];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build URL with query parameters
      const url = new URL(window.location.origin + api.posts.list.path);
      if (filters?.topic) url.searchParams.set("topic", filters.topic);
      if (filters?.difficulty) url.searchParams.set("difficulty", filters.difficulty);
      if (filters?.search) url.searchParams.set("search", filters.search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch posts");
      
      // Validate with Zod schema from routes
      return api.posts.list.responses[200].parse(await res.json());
    },
  });
}

// Hook for fetching a single post by ID
export function usePost(id: number) {
  return useQuery({
    queryKey: [api.posts.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.posts.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      
      return api.posts.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Hook for fetching a single post by Slug
export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: [api.posts.getBySlug.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.posts.getBySlug.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      
      return api.posts.getBySlug.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// Hook for creating a new post (Admin feature, typically)
export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newPost: z.infer<typeof api.posts.create.input>) => {
      const res = await fetch(api.posts.create.path, {
        method: api.posts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create post");
      }
      
      return api.posts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.posts.list.path] });
    },
  });
}
