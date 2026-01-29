import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Posts API
  app.get(api.posts.list.path, async (req, res) => {
    const filters = {
      topic: req.query.topic as string | undefined,
      difficulty: req.query.difficulty as string | undefined,
      search: req.query.search as string | undefined,
    };
    const posts = await storage.getPosts(filters);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPost(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });

  app.get(api.posts.getBySlug.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Subscribers API
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      await storage.createSubscriber(input);
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle unique constraint violation vaguely for privacy
      res.status(400).json({ message: "Unable to subscribe with this email" });
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    const seedPosts = [
      {
        title: "Introduction to Calculus: Limits and Continuity",
        slug: "intro-to-calculus-limits",
        content: `Calculus is the mathematical study of continuous change. It has two major branches: differential calculus and integral calculus.

### The Concept of a Limit

The limit is a fundamental concept in calculus. It describes the value that a function (or sequence) approaches as the input (or index) approaches some value.

$$ \\lim_{x \\to c} f(x) = L $$

This means that as $x$ gets closer and closer to $c$, $f(x)$ gets closer and closer to $L$.

### Continuity

A function is continuous at a point if the limit exists at that point, the function is defined at that point, and the limit equals the function value.

$$ \\lim_{x \\to c} f(x) = f(c) $$

Continuity is essential for the Intermediate Value Theorem and many other properties in analysis.`,
        summary: "Understand the fundamental building blocks of Calculus: limits and continuity. Essential for beginners.",
        readTime: 5,
        difficulty: "Beginner",
        topic: "Calculus",
        authorName: "Dr. Sarah Mitchell",
        authorRole: "Professor of Mathematics",
        coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
      },
      {
        title: "Understanding Linear Algebra: Vectors and Matrices",
        slug: "understanding-linear-algebra",
        content: `Linear algebra is the branch of mathematics concerning linear equations and their representations in vector spaces and through matrices.

### Vectors

A vector is an object that has both a magnitude and a direction. Geometrically, we can picture a vector as a directed line segment.

$$ \\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{bmatrix} $$

### Matrix Multiplication

Matrix multiplication is a fundamental operation. If $A$ is an $m \\times n$ matrix and $B$ is an $n \\times p$ matrix, their matrix product $AB$ is an $m \\times p$ matrix.

$$ (AB)_{ij} = \\sum_{k=1}^n A_{ik} B_{kj} $$

Linear algebra is fundamental to modern geometry, including defining basic objects such as lines, planes, and rotations.`,
        summary: "Dive into the world of vectors and matrices. A crucial topic for computer science and physics.",
        readTime: 8,
        difficulty: "Intermediate",
        topic: "Linear Algebra",
        authorName: "James Chen",
        authorRole: "Data Scientist",
        coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80"
      },
      {
        title: "Number Theory: The Beauty of Prime Numbers",
        slug: "number-theory-primes",
        content: `Number theory is a branch of pure mathematics devoted primarily to the study of the integers and integer-valued functions.

### Prime Numbers

A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.

The sequence of prime numbers starts:
2, 3, 5, 7, 11, 13, 17, 19, 23, ...

### The Fundamental Theorem of Arithmetic

Every integer greater than 1 either is a prime number itself or can be represented as the product of prime numbers in a unique way.

$$ n = p_1^{a_1} p_2^{a_2} \\cdots p_k^{a_k} $$

This theorem is the reason why prime numbers are often referred to as the "building blocks" of the integers.`,
        summary: "Explore the fascinating properties of prime numbers and modular arithmetic.",
        readTime: 6,
        difficulty: "Beginner",
        topic: "Number Theory",
        authorName: "Dr. Sarah Mitchell",
        authorRole: "Professor of Mathematics",
        coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
      },
      {
        title: "Probability Theory: Bayes' Theorem",
        slug: "probability-bayes-theorem",
        content: `Probability theory is the branch of mathematics concerned with probability. Although there are several different probability interpretations, probability theory treats the concept in a rigorous mathematical manner.

### Bayes' Theorem

Bayes' theorem describes the probability of an event, based on prior knowledge of conditions that might be related to the event.

$$ P(A|B) = \\frac{P(B|A) P(A)}{P(B)} $$

Where:
- $P(A|B)$ is the probability of event A occurring given that B is true.
- $P(B|A)$ is the probability of event B occurring given that A is true.
- $P(A)$ and $P(B)$ are the probabilities of observing A and B independently.

Bayes' theorem is central to Bayesian inference, a statistical approach used in machine learning and data analysis.`,
        summary: "Learn how to update probabilities with new evidence using Bayes' Theorem.",
        readTime: 10,
        difficulty: "Advanced",
        topic: "Probability",
        authorName: "Elena Rodriguez",
        authorRole: "Statistician",
        coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80"
      }
    ];

    for (const post of seedPosts) {
      await storage.createPost(post);
    }
  }
}
