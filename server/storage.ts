import { db } from "./db";
import {
  posts,
  subscribers,
  type Post,
  type InsertPost,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";
import { eq, ilike, and, desc } from "drizzle-orm";

export interface IStorage {
  getPosts(filters?: { topic?: string; difficulty?: string; search?: string }): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(filters?: { topic?: string; difficulty?: string; search?: string }): Promise<Post[]> {
    const conditions = [];
    if (filters?.topic) conditions.push(eq(posts.topic, filters.topic));
    if (filters?.difficulty) conditions.push(eq(posts.difficulty, filters.difficulty));
    if (filters?.search) conditions.push(ilike(posts.title, `%${filters.search}%`));

    return await db.select()
      .from(posts)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [newSubscriber] = await db.insert(subscribers).values(subscriber).returning();
    return newSubscriber;
  }
}

export const storage = new DatabaseStorage();
