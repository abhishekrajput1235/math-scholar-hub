import { z } from "zod";

// Post type definition
export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  summary: z.string().optional(),
  coverUrl: z.string().optional(),
  readTime: z.number().optional(),
  difficulty: z.string().optional(),
  topic: z.string().optional(),
  authorName: z.string().optional(),
  authorRole: z.string().optional(),
  createdAt: z.coerce.date(),
});

export type Post = z.infer<typeof PostSchema>;

// Subscriber schema
export const SubscriberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type Subscriber = z.infer<typeof SubscriberSchema>;

// API route definitions (for frontend-only, these are placeholders)
export const api = {
  posts: {
    list: {
      path: "/api/posts",
      responses: {
        200: z.array(PostSchema),
      },
    },
    get: {
      path: "/api/posts/:id",
      responses: {
        200: PostSchema,
      },
    },
    getBySlug: {
      path: "/api/posts/slug/:slug",
      responses: {
        200: PostSchema,
      },
    },
    create: {
      path: "/api/posts",
      method: "POST",
      input: PostSchema.omit({ id: true, createdAt: true }),
      responses: {
        201: PostSchema,
      },
    },
  },
  subscribers: {
    create: {
      path: "/api/subscribers",
      method: "POST",
      input: SubscriberSchema,
      responses: {
        201: z.object({ message: z.string() }),
      },
    },
  },
} as const;

// Build URL helper function
export function buildUrl(path: string, params: Record<string, string | number>): string {
  let url = path;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, String(value));
  }
  return url;
}
