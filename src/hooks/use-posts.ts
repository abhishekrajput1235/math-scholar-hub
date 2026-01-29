import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Post } from "@/lib/types";
import { z } from "zod";

// Valid filters for listing posts
type PostFilters = {
  topic?: string;
  difficulty?: string;
  search?: string;
};

// Dummy data for development when backend is not available
const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    title: "Understanding the Fundamental Theorem of Calculus",
    slug: "fundamental-theorem-calculus",
    content: `# Introduction

The Fundamental Theorem of Calculus is one of the most important theorems in mathematics, bridging the gap between differential and integral calculus. It establishes the profound connection between derivatives and integrals, two concepts that initially seem quite different.

## Historical Context

The theorem was discovered independently by Isaac Newton and Gottfried Wilhelm Leibniz in the late 17th century. This discovery revolutionized mathematics and physics, providing powerful tools for solving problems involving motion, area, and change.

## Part 1: The First Fundamental Theorem

The first part of the theorem states that if $f$ is continuous on $[a, b]$ and $F$ is defined by:

$$F(x) = \\int_a^x f(t) \\, dt$$

Then $F$ is differentiable on $(a, b)$ and:

$$F'(x) = f(x)$$

### What Does This Mean?

This part tells us that **integration and differentiation are inverse operations**. If you integrate a function and then differentiate the result, you get back to the original function.

### Example 1

Let's find the derivative of $F(x) = \\int_0^x t^2 \\, dt$

By the First Fundamental Theorem:
$$F'(x) = x^2$$

We can verify this by computing the integral directly:
$$F(x) = \\int_0^x t^2 \\, dt = \\left[\\frac{t^3}{3}\\right]_0^x = \\frac{x^3}{3}$$

And differentiating:
$$F'(x) = \\frac{d}{dx}\\left(\\frac{x^3}{3}\\right) = x^2$$ ✓

## Part 2: The Second Fundamental Theorem

The second part provides a method for evaluating definite integrals. If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$, then:

$$\\int_a^b f(x) \\, dx = F(b) - F(a)$$

### Example 2

Let's evaluate $\\int_1^3 x^2 \\, dx$

First, find an antiderivative of $f(x) = x^2$:
$$F(x) = \\frac{x^3}{3}$$

Then apply the theorem:
$$\\int_1^3 x^2 \\, dx = F(3) - F(1) = \\frac{27}{3} - \\frac{1}{3} = 9 - \\frac{1}{3} = \\frac{26}{3}$$

## Practical Applications

### 1. Computing Area Under Curves

The theorem allows us to calculate the exact area under a curve without approximating with rectangles:

$$\\text{Area} = \\int_a^b f(x) \\, dx = F(b) - F(a)$$

### 2. Physics: Distance and Velocity

If $v(t)$ is velocity as a function of time, the total distance traveled from $t = a$ to $t = b$ is:

$$\\text{Distance} = \\int_a^b v(t) \\, dt$$

### 3. Economics: Total Cost

If $C'(x)$ is the marginal cost function, the total cost of producing from $x = a$ to $x = b$ units is:

$$\\text{Total Cost} = \\int_a^b C'(x) \\, dx = C(b) - C(a)$$

## Important Properties

> **Note**: The function must be continuous on the interval for the theorem to apply.

### Chain Rule Extension

When the limits of integration are functions, we use the chain rule:

$$\\frac{d}{dx}\\int_{g(x)}^{h(x)} f(t) \\, dt = f(h(x))h'(x) - f(g(x))g'(x)$$

### Example 3

Find $\\frac{d}{dx}\\int_{x^2}^{x^3} \\sin(t) \\, dt$

Using the formula:
$$\\frac{d}{dx}\\int_{x^2}^{x^3} \\sin(t) \\, dt = \\sin(x^3) \\cdot 3x^2 - \\sin(x^2) \\cdot 2x$$

## Common Mistakes to Avoid

1. **Forgetting the chain rule** when limits are functions
2. **Not checking continuity** of the integrand
3. **Mixing up the order** of $F(b) - F(a)$
4. **Forgetting the constant** when finding antiderivatives

## Conclusion

The Fundamental Theorem of Calculus is truly fundamental because it:

- **Unifies calculus** by connecting differentiation and integration
- **Provides computational power** for evaluating definite integrals
- **Enables applications** across physics, engineering, and economics
- **Reveals deep mathematical truths** about continuous functions

Understanding this theorem deeply is essential for anyone studying calculus and its applications. Practice with various examples to build intuition and computational skill.

## Practice Problems

1. Find $\\frac{d}{dx}\\int_0^x e^{t^2} \\, dt$
2. Evaluate $\\int_0^\\pi \\sin(x) \\, dx$
3. If $F(x) = \\int_1^{x^2} \\frac{1}{t} \\, dt$, find $F'(x)$

**Solutions:**
1. $e^{x^2}$ (by Part 1)
2. $2$ (by Part 2: $[-\\cos(x)]_0^\\pi = -(-1) - (-1) = 2$)
3. $\\frac{2x}{x^2} = \\frac{2}{x}$ (by chain rule)`,
    summary: "Explore the deep connection between derivatives and integrals, and understand why this theorem is considered fundamental to calculus.",
    coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    readTime: 12,
    difficulty: "Intermediate",
    topic: "Calculus",
    authorName: "Dr. Sarah Johnson",
    authorRole: "Mathematics Professor",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Introduction to Group Theory",
    slug: "introduction-group-theory",
    content: `# What is Group Theory?

Group theory is the study of algebraic structures known as groups, which capture the essence of symmetry in mathematics. It's one of the most powerful and elegant areas of abstract algebra, with applications ranging from particle physics to cryptography.

## Definition of a Group

A **group** is a set $G$ together with a binary operation $*$ that satisfies four fundamental properties:

### 1. Closure
For all $a, b \\in G$, we have $a * b \\in G$

The result of the operation stays within the group.

### 2. Associativity
For all $a, b, c \\in G$, we have $(a * b) * c = a * (b * c)$

The order of operations doesn't matter.

### 3. Identity Element
There exists an element $e \\in G$ such that for all $a \\in G$:
$$e * a = a * e = a$$

### 4. Inverse Element
For each $a \\in G$, there exists an element $a^{-1} \\in G$ such that:
$$a * a^{-1} = a^{-1} * a = e$$

## Classical Examples

### Example 1: Integers Under Addition $(\\mathbb{Z}, +)$

Let's verify the group axioms:

- **Closure**: $3 + 5 = 8 \\in \\mathbb{Z}$ ✓
- **Associativity**: $(2 + 3) + 4 = 2 + (3 + 4) = 9$ ✓
- **Identity**: $0$ is the identity since $a + 0 = 0 + a = a$ ✓
- **Inverse**: For any $a \\in \\mathbb{Z}$, we have $-a$ such that $a + (-a) = 0$ ✓

### Example 2: Symmetries of an Equilateral Triangle

The symmetries of an equilateral triangle form a group called $D_3$ (dihedral group of order 6).

**Elements:**
- Identity (do nothing): $e$
- Rotations: $r$ (120°), $r^2$ (240°)
- Reflections: $s_1, s_2, s_3$ (across three axes)

**Operation**: Composition of symmetries

This group has 6 elements and is non-abelian (order matters).

### Example 3: Invertible Matrices

The set $GL(n, \\mathbb{R})$ of all invertible $n \\times n$ matrices with real entries forms a group under matrix multiplication.

For $n = 2$:
$$GL(2, \\mathbb{R}) = \\left\\{ \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} : ad - bc \\neq 0 \\right\\}$$

## Important Concepts

### Abelian Groups

A group is **abelian** (commutative) if for all $a, b \\in G$:
$$a * b = b * a$$

**Examples of abelian groups:**
- $(\\mathbb{Z}, +)$
- $(\\mathbb{R} \\setminus \\{0\\}, \\times)$
- $(\\mathbb{Z}_n, +)$ (integers modulo $n$)

**Non-abelian example:**
- $GL(n, \\mathbb{R})$ for $n \\geq 2$

### Order of a Group

The **order** of a group $G$, denoted $|G|$, is the number of elements in $G$.

### Order of an Element

The **order** of an element $g \\in G$ is the smallest positive integer $n$ such that:
$$g^n = e$$

If no such $n$ exists, the element has infinite order.

### Subgroups

A subset $H \\subseteq G$ is a **subgroup** if $H$ is itself a group under the same operation.

> **Theorem (Subgroup Criterion)**: $H$ is a subgroup of $G$ if and only if:
> 1. $H$ is non-empty
> 2. For all $a, b \\in H$, we have $ab^{-1} \\in H$

## Lagrange's Theorem

One of the most important theorems in group theory:

> **Lagrange's Theorem**: If $H$ is a subgroup of a finite group $G$, then $|H|$ divides $|G|$.

### Corollary
The order of any element divides the order of the group.

### Example Application

In $\\mathbb{Z}_{12}$, the possible orders of elements are divisors of 12: 1, 2, 3, 4, 6, 12.

## Cyclic Groups

A group $G$ is **cyclic** if there exists an element $g \\in G$ such that every element of $G$ can be written as $g^n$ for some integer $n$.

We write $G = \\langle g \\rangle$ and call $g$ a **generator**.

### Examples

1. $(\\mathbb{Z}, +)$ is cyclic: $\\mathbb{Z} = \\langle 1 \\rangle = \\langle -1 \\rangle$
2. $(\\mathbb{Z}_n, +)$ is cyclic: $\\mathbb{Z}_n = \\langle 1 \\rangle$
3. The group of rotations of a regular $n$-gon is cyclic

> **Theorem**: Every cyclic group is abelian.

## Homomorphisms

A **group homomorphism** is a function $\\phi: G \\to H$ between groups that preserves the group operation:

$$\\phi(a * b) = \\phi(a) * \\phi(b)$$

### Properties

1. $\\phi(e_G) = e_H$ (identity maps to identity)
2. $\\phi(a^{-1}) = \\phi(a)^{-1}$ (inverses are preserved)
3. If $\\phi$ is bijective, it's called an **isomorphism**

### Example

The exponential function $\\exp: (\\mathbb{R}, +) \\to (\\mathbb{R}^+, \\times)$ is a homomorphism:

$$\\exp(x + y) = e^x \\cdot e^y = \\exp(x) \\times \\exp(y)$$

## Applications of Group Theory

### 1. Symmetry in Physics

Groups describe fundamental symmetries in nature:
- **Lorentz group**: Special relativity
- **Gauge groups**: Particle physics
- **Poincaré group**: Spacetime symmetries

### 2. Crystallography

The 230 space groups classify all possible crystal structures.

### 3. Cryptography

- **RSA encryption**: Based on multiplicative groups modulo $n$
- **Elliptic curve cryptography**: Uses groups of points on elliptic curves

### 4. Rubik's Cube

The set of all possible moves forms a group with approximately $4.3 \\times 10^{19}$ elements!

## The Classification Theorem

One of the greatest achievements in mathematics:

> **Finite Simple Group Classification**: Every finite simple group belongs to one of 18 infinite families or is one of 26 sporadic groups.

This theorem's proof spans tens of thousands of pages and took hundreds of mathematicians decades to complete.

## Moving Forward

To deepen your understanding of group theory, study:

1. **Quotient groups** and normal subgroups
2. **Group actions** on sets
3. **Sylow theorems** for analyzing finite groups
4. **Representation theory** connecting groups to linear algebra
5. **Lie groups** for continuous symmetries

## Practice Problems

1. Prove that in any group, the identity element is unique.
2. Show that $(\\mathbb{Q} \\setminus \\{0\\}, \\times)$ is an abelian group.
3. Find all subgroups of $\\mathbb{Z}_6$.
4. Prove that a group with exactly 2 elements must be cyclic.

## Conclusion

Group theory provides a unified language for studying symmetry across mathematics and science. Its abstract nature belies its concrete applications, from solving polynomial equations to understanding quantum mechanics. As you continue your journey in mathematics, you'll find groups appearing everywhere, revealing the deep structures underlying diverse phenomena.`,
    summary: "Learn the basics of group theory, including groups, subgroups, and fundamental theorems that shape modern algebra.",
    coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    readTime: 15,
    difficulty: "Advanced",
    topic: "Algebra",
    authorName: "Prof. Michael Chen",
    authorRole: "Pure Mathematics Researcher",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 3,
    title: "The Beauty of Euclidean Geometry",
    slug: "beauty-euclidean-geometry",
    content: `# Euclidean Geometry

Euclid's *Elements*, written around 300 BCE, laid the foundation for geometry as we know it. This masterwork of mathematical reasoning has influenced thinkers for over 2,000 years and remains a testament to the power of logical deduction.

## The Five Postulates

Euclid built his entire geometric system on five fundamental assumptions:

### Postulate 1: The Straight Line
**A straight line segment can be drawn joining any two points.**

This seems obvious, but it establishes that space is connected—we can always draw a path between points.

### Postulate 2: Extension
**Any straight line segment can be extended indefinitely in a straight line.**

Lines have no end; they continue forever in both directions.

### Postulate 3: The Circle
**Given any straight line segment, a circle can be drawn having the segment as radius and one endpoint as center.**

This gives us the tool of the compass and establishes circular symmetry.

### Postulate 4: Right Angles
**All right angles are congruent.**

A right angle is the same everywhere—space has uniform properties.

### Postulate 5: The Parallel Postulate
**If a line segment intersects two straight lines forming two interior angles on the same side that sum to less than 180°, then the two lines, if extended indefinitely, meet on that side.**

This is equivalent to: *Through a point not on a line, there is exactly one parallel line.*

> **Historical Note**: This postulate was controversial for centuries. Attempts to prove it from the other four eventually led to the discovery of non-Euclidean geometries!

## Classic Theorems

### The Pythagorean Theorem

Perhaps the most famous theorem in all of mathematics:

$$a^2 + b^2 = c^2$$

Where $c$ is the hypotenuse of a right triangle with legs $a$ and $b$.

**Proof (One of Many)**:

Consider a square with side length $a + b$. We can arrange four identical right triangles inside it in two different ways:

- Method 1: Area = $(a+b)^2$
- Method 2: Area = $c^2 + 4 \\cdot \\frac{1}{2}ab$

Therefore:
$$(a+b)^2 = c^2 + 2ab$$
$$a^2 + 2ab + b^2 = c^2 + 2ab$$
$$a^2 + b^2 = c^2$$ ✓

### The Sum of Angles in a Triangle

**Theorem**: The sum of the interior angles of any triangle is $180°$.

**Proof**:
1. Draw a line through vertex $A$ parallel to side $BC$
2. By alternate interior angles, we can show all three angles at $A$ sum to $180°$
3. These three angles are congruent to the three angles of the triangle

Therefore: $\\angle A + \\angle B + \\angle C = 180°$

### The Inscribed Angle Theorem

**Theorem**: An angle inscribed in a circle is half the central angle that subtends the same arc.

If $\\angle APB$ is inscribed and $\\angle AOB$ is the central angle:
$$\\angle APB = \\frac{1}{2} \\angle AOB$$

**Corollary**: All angles inscribed in a semicircle are right angles!

## Congruence Criteria

Two triangles are congruent if they satisfy any of these criteria:

### SSS (Side-Side-Side)
All three corresponding sides are equal.

### SAS (Side-Angle-Side)
Two sides and the included angle are equal.

### ASA (Angle-Side-Angle)
Two angles and the included side are equal.

### AAS (Angle-Angle-Side)
Two angles and a non-included side are equal.

### HL (Hypotenuse-Leg)
For right triangles: hypotenuse and one leg are equal.

> **Warning**: AAA (Angle-Angle-Angle) proves similarity, not congruence!

## Similarity

Two figures are **similar** if they have the same shape but not necessarily the same size.

### Similarity Criteria for Triangles

**AA (Angle-Angle)**: If two angles are equal, the triangles are similar.

**SSS (Side-Side-Side)**: If all three side ratios are equal:
$$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$$

**SAS (Side-Angle-Side)**: Two side ratios equal and included angle equal.

### Applications of Similarity

**Example: Measuring Heights**

To find the height of a tree without climbing it:
1. Measure the shadow of the tree: $s_t = 15$ m
2. Measure a stick's height and shadow: $h_s = 1$ m, $s_s = 0.75$ m
3. Use similar triangles:

$$\\frac{h_t}{s_t} = \\frac{h_s}{s_s}$$
$$h_t = \\frac{s_t \\cdot h_s}{s_s} = \\frac{15 \\cdot 1}{0.75} = 20 \\text{ m}$$

## The Circle

### Key Definitions

- **Radius**: Distance from center to any point on the circle
- **Diameter**: $d = 2r$
- **Circumference**: $C = 2\\pi r = \\pi d$
- **Area**: $A = \\pi r^2$

### Chord Properties

**Theorem**: Equal chords are equidistant from the center.

**Theorem**: The perpendicular from the center of a circle to a chord bisects the chord.

### Tangent Properties

**Theorem**: A tangent to a circle is perpendicular to the radius at the point of tangency.

**Theorem**: Two tangents drawn from an external point to a circle are equal in length.

## Area Formulas

### Triangle
$$A = \\frac{1}{2}bh$$

**Heron's Formula** (when you know all three sides):
$$A = \\sqrt{s(s-a)(s-b)(s-c)}$$
where $s = \\frac{a+b+c}{2}$ is the semi-perimeter.

### Parallelogram
$$A = bh$$

### Trapezoid
$$A = \\frac{1}{2}(b_1 + b_2)h$$

### Regular Polygon
For a regular $n$-gon with side length $s$:
$$A = \\frac{ns^2}{4\\tan(\\pi/n)}$$

## Construction Problems

The ancient Greeks loved construction problems using only a compass and straightedge.

### Possible Constructions
1. Bisecting an angle
2. Constructing a perpendicular
3. Dividing a segment into equal parts
4. Constructing a square with given side
5. Inscribing and circumscribing circles

### The Three Impossible Problems

For 2,000 years, mathematicians tried to solve these with compass and straightedge:

1. **Squaring the circle**: Construct a square with the same area as a given circle
2. **Doubling the cube**: Construct a cube with twice the volume of a given cube
3. **Trisecting the angle**: Divide an arbitrary angle into three equal parts

In the 19th century, these were proven **impossible** using algebraic methods!

## The Golden Ratio

The **golden ratio** $\\phi$ appears throughout geometry:

$$\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$$

### Properties

- $\\phi^2 = \\phi + 1$
- $\\frac{1}{\\phi} = \\phi - 1$
- Appears in the regular pentagon
- Found in the Fibonacci sequence: $\\lim_{n\\to\\infty} \\frac{F_{n+1}}{F_n} = \\phi$

### The Golden Rectangle

A rectangle with sides in ratio $\\phi:1$ has a special property: removing a square leaves another golden rectangle!

## Applications of Euclidean Geometry

### Architecture
- The Parthenon uses golden ratio proportions
- Gothic cathedrals employ geometric principles for structural stability

### Art
- Renaissance artists used geometric perspective
- Islamic art features intricate geometric patterns

### Engineering
- Bridge design relies on geometric strength
- Optimal packing problems use geometric efficiency

### Navigation
- Great circle routes (geodesics on a sphere)
- Triangulation for GPS and surveying

## Beyond Euclid

While Euclidean geometry is powerful, it's not the whole story:

### Non-Euclidean Geometries

**Hyperbolic Geometry**: Infinitely many parallel lines through a point
- Models: Poincaré disk, upper half-plane
- Applications: Theory of relativity, some art (M.C. Escher)

**Elliptic Geometry**: No parallel lines exist
- Models: Sphere (with opposite points identified)
- Applications: Navigation on Earth

### Modern Developments

- **Differential Geometry**: Studies curved spaces
- **Algebraic Geometry**: Uses algebra to study geometric objects
- **Computational Geometry**: Algorithms for geometric problems

## Practice Problems

1. Prove that the diagonals of a parallelogram bisect each other.
2. Find the area of a triangle with sides 5, 12, and 13.
3. Two circles with radii 3 and 4 have centers 10 apart. Find the length of their common external tangent.
4. Prove that the angle bisectors of a triangle meet at a single point (the incenter).

## Conclusion

Euclidean geometry is more than just ancient mathematics—it's a training ground for logical thinking and spatial reasoning. The theorems we've explored have stood the test of time, finding applications in fields Euclid never imagined.

The beauty of geometry lies not just in its practical applications, but in the elegant way simple axioms generate a rich tapestry of interconnected truths. As you study geometry, you're participating in a 2,300-year-old conversation about the nature of space and reasoning itself.`,
    summary: "Discover the elegant principles of Euclidean geometry and explore classic theorems that have stood the test of time.",
    coverUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800",
    readTime: 8,
    difficulty: "Beginner",
    topic: "Geometry",
    authorName: "Dr. Emily Rodriguez",
    authorRole: "Geometry Specialist",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: 4,
    title: "Prime Numbers and the Riemann Hypothesis",
    slug: "prime-numbers-riemann-hypothesis",
    content: `# The Mystery of Primes

Prime numbers have fascinated mathematicians for over 2,000 years. These numbers, divisible only by 1 and themselves, are the building blocks of all integers—yet their distribution seems chaotic and unpredictable. The Riemann Hypothesis, one of the seven Millennium Prize Problems, may hold the key to understanding them.

## What Are Prime Numbers?

A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself.

**First few primes**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37...

**Note**: 2 is the only even prime number!

### The Fundamental Theorem of Arithmetic

Every integer greater than 1 can be expressed uniquely as a product of prime numbers (up to order).

For example:
- $60 = 2^2 \\times 3 \\times 5$
- $100 = 2^2 \\times 5^2$
- $1001 = 7 \\times 11 \\times 13$

This makes primes the "atoms" of number theory.

## How Many Primes Are There?

### Euclid's Theorem

**Theorem**: There are infinitely many prime numbers.

**Proof** (by contradiction):

Suppose there are finitely many primes: $p_1, p_2, ..., p_n$

Consider the number:
$$N = p_1 \\times p_2 \\times ... \\times p_n + 1$$

Now, $N$ is either prime or composite:

- If $N$ is prime, we found a prime not in our list (since $N > p_i$ for all $i$)
- If $N$ is composite, it must have a prime divisor $p$
  - But $p$ can't be any of $p_1, ..., p_n$ because dividing $N$ by any $p_i$ leaves remainder 1
  - So $p$ is a new prime!

Either way, our list was incomplete. ∎

> This elegant proof, written around 300 BCE, is still taught today as a masterpiece of mathematical reasoning.

## The Prime Number Theorem

While we know there are infinitely many primes, how are they distributed?

Let $\\pi(x)$ denote the number of primes less than or equal to $x$.

**Examples**:
- $\\pi(10) = 4$ (primes: 2, 3, 5, 7)
- $\\pi(100) = 25$
- $\\pi(1000) = 168$

### The Main Result

**Prime Number Theorem**: As $x$ approaches infinity:

$$\\pi(x) \\sim \\frac{x}{\\ln(x)}$$

This means:
$$\\lim_{x \\to \\infty} \\frac{\\pi(x)}{x/\\ln(x)} = 1$$

**Consequence**: The "average gap" between consecutive primes near $n$ is approximately $\\ln(n)$.

### Historical Context

- **Conjectured**: Gauss and Legendre (early 1800s)
- **Proved**: Hadamard and de la Vallée Poussin (1896)
- **Required**: Complex analysis and the Riemann zeta function!

## The Riemann Zeta Function

The connection between primes and complex analysis comes through an extraordinary function:

$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = 1 + \\frac{1}{2^s} + \\frac{1}{3^s} + \\frac{1}{4^s} + ...$$

for complex numbers $s$ with $\\text{Re}(s) > 1$.

### Euler's Product Formula

Euler discovered a stunning connection to primes:

$$\\zeta(s) = \\prod_{p \\text{ prime}} \\frac{1}{1 - p^{-s}}$$

This shows **the distribution of all integers is encoded in the primes**!

### Special Values

- $\\zeta(2) = \\frac{\\pi^2}{6}$ (Euler's famous result)
- $\\zeta(4) = \\frac{\\pi^4}{90}$
- $\\zeta(2k) = $ rational multiple of $\\pi^{2k}$ for all positive integers $k$

But odd values like $\\zeta(3) \\approx 1.202$ (Apéry's constant) remain mysterious!

## The Riemann Hypothesis

### The Statement

**Riemann Hypothesis**: All non-trivial zeros of the zeta function have real part equal to $\\frac{1}{2}$.

In other words, if $\\zeta(s) = 0$ and $s$ is not a negative even integer, then:
$$s = \\frac{1}{2} + it$$

for some real number $t$.

### Why Does This Matter?

The Riemann Hypothesis would give us:

1. **Precise control** over the error term in the Prime Number Theorem
2. **Optimal bounds** on the distribution of primes
3. **Deep insights** into the "randomness" of primes

**If true**, it would tell us that primes are distributed as "evenly as possible" given their average density.

### The Error Term

The Prime Number Theorem can be refined:

$$\\pi(x) = \\text{Li}(x) + E(x)$$

where $\\text{Li}(x) = \\int_2^x \\frac{dt}{\\ln(t)}$ is the logarithmic integral.

**If RH is true**: $|E(x)| = O(\\sqrt{x} \\ln(x))$

**If RH is false**: The error could be much larger!

## Evidence and Attempts

### Computational Evidence

- First **10 trillion** zeros have been verified to lie on the critical line $\\text{Re}(s) = \\frac{1}{2}$
- No counterexamples found despite extensive searching
- But infinity is a long way away!

### Equivalent Statements

The Riemann Hypothesis is equivalent to many other statements:

1. $|\\pi(x) - \\text{Li}(x)| < \\frac{1}{8\\pi}\\sqrt{x}\\ln(x)$ for $x \\geq 2657$
2. Certain bounds on the Möbius function
3. Bounds on the divisor function
4. Properties of the Farey sequence

### Why So Difficult?

1. **No pattern** to the zeros has been found
2. **Complex analysis** required at deep levels
3. **Analytic number theory** pushes modern mathematics to its limits
4. May require **entirely new mathematics** to solve

## Applications of Prime Number Theory

### Cryptography

**RSA Encryption** relies on the difficulty of factoring large numbers into primes.

- Easy: Multiply two 300-digit primes
- Hard: Factor their 600-digit product

This asymmetry secures internet communications!

### Random Number Generation

Prime gaps exhibit pseudo-random properties useful for:
- Monte Carlo simulations
- Cryptographic protocols
- Hash functions

### Quantum Computing

Understanding prime distribution may help:
- Factor large numbers efficiently (Shor's algorithm)
- Test conjectures about prime gaps
- Explore connections to quantum chaos

## Open Problems Beyond Riemann

### Twin Prime Conjecture

Are there infinitely many pairs of primes differing by 2?

Examples: (3,5), (5,7), (11,13), (17,19), (29,31)...

**Status**: Unproven, but Zhang (2013) proved there are infinitely many prime pairs with gap $< 70$ million. Now improved to gap $< 246$!

### Goldbach's Conjecture

Every even integer greater than 2 is the sum of two primes.

**Examples**:
- $4 = 2 + 2$
- $6 = 3 + 3$
- $8 = 3 + 5$
- $100 = 47 + 53$

**Status**: Verified for all even numbers up to $4 \\times 10^{18}$, but no general proof.

### Mersenne Primes

Primes of the form $M_p = 2^p - 1$ where $p$ is prime.

**Known Mersenne primes**: Only 51 found so far!

**Largest known**: $2^{82,589,933} - 1$ (has 24,862,048 digits!)

**Question**: Are there infinitely many?

## The Million Dollar Question

The Clay Mathematics Institute offers **$1,000,000** for a proof or disproof of the Riemann Hypothesis.

### What Would a Proof Mean?

- **Mathematical**: Unlock countless theorems that assume RH
- **Practical**: Potentially impact cryptography
- **Philosophical**: Reveal deep order in apparent chaos

### What Would a Disproof Mean?

- **Shocking**: Contradict extensive numerical evidence
- **Revolutionary**: Force rethinking of analytic number theory
- **Fascinating**: Show primes are even more mysterious than thought!

## Studying Further

To understand the Riemann Hypothesis deeply, study:

1. **Complex Analysis**: Contour integration, analytic continuation
2. **Analytic Number Theory**: Dirichlet series, L-functions
3. **Fourier Analysis**: Transform theory and harmonic analysis
4. **Functional Equations**: Symmetries of the zeta function

Recommended reading:
- *Prime Obsession* by John Derbyshire (popular)
- *The Riemann Hypothesis* by Peter Borwein et al. (technical)
- Riemann's original 1859 paper (surprisingly accessible!)

## Conclusion

The Riemann Hypothesis stands at the intersection of pure mathematics' deepest mysteries. It connects:
- Number theory and analysis
- Discrete and continuous mathematics  
- Ancient questions and modern techniques

Whether proved, disproved, or remaining open, it continues to drive mathematical progress. The journey to understand primes has already given us powerful tools and beautiful theorems. The destination—if we ever reach it—promises to be spectacular.

> "God may not play dice with the universe, but something strange is going on with the prime numbers." — Paul Erdős`,
    summary: "Delve into the world of prime numbers and understand the significance of one of mathematics' greatest unsolved problems.",
    coverUrl: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800",
    readTime: 20,
    difficulty: "Advanced",
    topic: "Number Theory",
    authorName: "Dr. James Wilson",
    authorRole: "Number Theory Professor",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 5,
    title: "Introduction to Probability Theory",
    slug: "introduction-probability-theory",
    content: `# Probability Basics

Probability theory is the branch of mathematics concerned with analyzing random phenomena and quantifying uncertainty. From weather forecasting to quantum mechanics, probability provides the mathematical framework for reasoning about chance.

## What is Probability?

**Probability** measures how likely an event is to occur, on a scale from 0 (impossible) to 1 (certain).

### Formal Definition

For a sample space $\\Omega$ and event $E \\subseteq \\Omega$:

$$P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}}$$

This is the **classical definition**, valid when all outcomes are equally likely.

## Sample Spaces and Events

### Sample Space ($\\Omega$)

The set of all possible outcomes of an experiment.

**Examples**:
- Coin flip: $\\Omega = \\{H, T\\}$
- Die roll: $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$
- Two coin flips: $\\Omega = \\{HH, HT, TH, TT\\}$

### Events

An **event** is a subset of the sample space.

**Example**: Rolling an even number on a die
$$E = \\{2, 4, 6\\}$$
$$P(E) = \\frac{3}{6} = \\frac{1}{2}$$

## Axioms of Probability

Probability must satisfy three fundamental axioms (Kolmogorov, 1933):

### Axiom 1: Non-negativity
$$P(E) \\geq 0$$ for any event $E$

### Axiom 2: Normalization  
$$P(\\Omega) = 1$$

The probability of *something* happening is 1.

### Axiom 3: Additivity
For mutually exclusive events $E_1, E_2$ (i.e., $E_1 \\cap E_2 = \\emptyset$):

$$P(E_1 \\cup E_2) = P(E_1) + P(E_2)$$

### Consequences

From these axioms, we can derive:

1. $P(\\emptyset) = 0$ (impossible event)
2. $P(E^c) = 1 - P(E)$ (complement rule)
3. $P(E_1 \\cup E_2) = P(E_1) + P(E_2) - P(E_1 \\cap E_2)$ (inclusion-exclusion)

## Computing Probabilities

### Example 1: Drawing Cards

What's the probability of drawing a heart from a standard 52-card deck?

$$P(\\text{Heart}) = \\frac{13}{52} = \\frac{1}{4}$$

### Example 2: Rolling Dice

What's the probability that the sum of two dice is 7?

**Favorable outcomes**: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes

**Total outcomes**: $6 \\times 6 = 36$

$$P(\\text{Sum} = 7) = \\frac{6}{36} = \\frac{1}{6}$$

### Example 3: Birthday Paradox

In a room of 23 people, what's the probability that at least two share a birthday?

**Easier**: Calculate probability that all have different birthdays!

$$P(\\text{all different}) = \\frac{365}{365} \\times \\frac{364}{365} \\times \\frac{363}{365} \\times ... \\times \\frac{343}{365} \\approx 0.493$$

$$P(\\text{at least one match}) = 1 - 0.493 = 0.507$$

**Surprising result**: Over 50% chance with just 23 people!

## Conditional Probability

**Conditional probability** is the probability of an event given that another event has occurred.

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

Read as: "Probability of A given B"

### Example: Disease Testing

- 1% of population has a disease: $P(D) = 0.01$
- Test is 95% accurate: $P(+|D) = 0.95$
- Test has 5% false positive rate: $P(+|D^c) = 0.05$

**Question**: If you test positive, what's the probability you have the disease?

We need $P(D|+)$!

## Bayes' Theorem

**Bayes' Theorem** allows us to "reverse" conditional probabilities:

$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$

### Solving the Disease Problem

$$P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+)}$$

First, find $P(+)$ using the law of total probability:

$$P(+) = P(+|D)P(D) + P(+|D^c)P(D^c)$$
$$= 0.95(0.01) + 0.05(0.99) = 0.0095 + 0.0495 = 0.059$$

Now:
$$P(D|+) = \\frac{0.95 \\times 0.01}{0.059} \\approx 0.161$$

**Result**: Only 16.1% chance you have the disease despite testing positive!

This counterintuitive result shows why understanding probability matters.

## Independence

Two events $A$ and $B$ are **independent** if:

$$P(A \\cap B) = P(A) \\times P(B)$$

Equivalently: $P(A|B) = P(A)$

Knowing $B$ occurred doesn't change the probability of $A$.

### Examples

**Independent**:
- Consecutive coin flips
- Die rolls
- Drawing cards *with replacement*

**Not Independent**:
- Drawing cards *without replacement*
- Weather on consecutive days
- Passing two exams (usually correlated!)

## Random Variables

A **random variable** is a function that assigns a number to each outcome in the sample space.

### Discrete Random Variables

Takes on countable values.

**Example**: $X$ = number of heads in 3 coin flips

Possible values: 0, 1, 2, 3

**Probability Mass Function (PMF)**:
- $P(X = 0) = \\frac{1}{8}$ (TTT)
- $P(X = 1) = \\frac{3}{8}$ (HTT, THT, TTH)
- $P(X = 2) = \\frac{3}{8}$ (HHT, HTH, THH)
- $P(X = 3) = \\frac{1}{8}$ (HHH)

### Expected Value

The **expected value** (or mean) of a random variable:

$$E[X] = \\sum_x x \\cdot P(X = x)$$

For our coin flip example:
$$E[X] = 0 \\cdot \\frac{1}{8} + 1 \\cdot \\frac{3}{8} + 2 \\cdot \\frac{3}{8} + 3 \\cdot \\frac{1}{8} = \\frac{12}{8} = 1.5$$

**Interpretation**: On average, we expect 1.5 heads in 3 flips.

### Variance

Measures spread around the mean:

$$\\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

**Standard Deviation**: $\\sigma = \\sqrt{\\text{Var}(X)}$

## Common Distributions

### Uniform Distribution

All outcomes equally likely.

**Example**: Fair die roll
$$P(X = k) = \\frac{1}{6}$$ for $k = 1, 2, 3, 4, 5, 6$

### Bernoulli Distribution

Single trial with two outcomes (success/failure).

$$P(X = 1) = p, \\quad P(X = 0) = 1-p$$

**Example**: Single coin flip with $p = 0.5$

### Binomial Distribution

Number of successes in $n$ independent Bernoulli trials.

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$

**Example**: Number of heads in 10 coin flips

$$E[X] = np, \\quad \\text{Var}(X) = np(1-p)$$

### Geometric Distribution

Number of trials until first success.

$$P(X = k) = (1-p)^{k-1} p$$

**Example**: Number of rolls until getting a 6

$$E[X] = \\frac{1}{p}$$

### Poisson Distribution

Number of events in a fixed interval (rare events).

$$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$$

**Examples**: 
- Number of emails received per hour
- Number of earthquakes per year
- Number of typos per page

$$E[X] = \\text{Var}(X) = \\lambda$$

## The Law of Large Numbers

**Weak Law**: As sample size $n$ increases, the sample average converges to the expected value:

$$\\lim_{n \\to \\infty} P\\left(\\left|\\frac{X_1 + ... + X_n}{n} - \\mu\\right| > \\epsilon\\right) = 0$$

**Practical meaning**: Flip a coin many times, and the proportion of heads approaches 0.5.

## Central Limit Theorem

One of the most important theorems in probability:

**Central Limit Theorem**: The sum (or average) of many independent random variables approaches a **normal distribution**, regardless of the original distribution!

$$\\frac{X_1 + ... + X_n - n\\mu}{\\sigma\\sqrt{n}} \\xrightarrow{d} N(0, 1)$$

### Why It Matters

This explains why:
- Heights, weights, test scores follow bell curves
- Measurement errors are normally distributed
- Statistical inference works!

## Applications

### 1. Gambling and Games

Understanding probability gives you:
- Expected values for casino games
- Optimal strategies for poker
- Why "the house always wins"

**Example**: Expected value of roulette bet on red:
$$E = \\frac{18}{38}(+1) + \\frac{20}{38}(-1) = -\\frac{2}{38} \\approx -0.053$$

You lose about 5.3 cents per dollar bet, on average.

### 2. Insurance

Insurance companies use probability to:
- Price premiums
- Calculate reserves
- Manage risk

### 3. Machine Learning

Probabilistic models power:
- Spam filters (Naive Bayes)
- Recommendation systems
- Natural language processing

### 4. Quantum Mechanics

In quantum theory, probability is fundamental—not just lack of knowledge!

Wave functions give probabilities for measuring different states.

## Common Misconceptions

### 1. Gambler's Fallacy

"I've flipped heads 5 times in a row, so tails is 'due'!"

**Wrong**: Each flip is independent. $P(\\text{Tails}) = 0.5$ regardless of history.

### 2. Law of Averages

"If I play long enough, I'll break even!"

**Wrong**: Expected losses accumulate. The Law of Large Numbers says proportion approaches expected value, not that you'll break even.

### 3. Conditional Probability Confusion

$P(A|B) \\neq P(B|A)$ in general!

Example: $P(\\text{rain}|\\text{clouds}) \\neq P(\\text{clouds}|\\text{rain})$

## Practice Problems

1. Two fair dice are rolled. Find $P(\\text{sum} > 9)$.

2. A bag contains 5 red and 3 blue marbles. Two are drawn without replacement. Find $P(\\text{both red})$.

3. If $P(A) = 0.3$, $P(B) = 0.4$, and $P(A \\cap B) = 0.12$, are $A$ and $B$ independent?

4. A test is 99% accurate. A disease affects 0.1% of the population. You test positive. Find $P(\\text{disease}|\\text{positive test})$.

## Conclusion

Probability theory provides the mathematical foundation for reasoning about uncertainty. From its axiomatic foundation to powerful theorems like the Central Limit Theorem, it gives us tools to:

- Quantify risk and uncertainty
- Make optimal decisions
- Understand random phenomena
- Build predictive models

As you continue your study of probability, you'll discover its deep connections to statistics, information theory, physics, and computer science. The subject's blend of intuitive ideas and rigorous mathematics makes it both accessible and profound.

> "Probability is the very guide of life." — Cicero`,
    summary: "Master the fundamentals of probability with clear explanations of key concepts, from sample spaces to random variables.",
    coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    readTime: 10,
    difficulty: "Beginner",
    topic: "Probability",
    authorName: "Dr. Lisa Anderson",
    authorRole: "Statistics & Probability Expert",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: 6,
    title: "Linear Algebra: Vector Spaces Explained",
    slug: "vector-spaces-explained",
    content: `# Vector Spaces

Vector spaces are fundamental structures in linear algebra, providing the mathematical framework for understanding geometry, physics, computer graphics, machine learning, and much more. They generalize our intuitive notion of "arrows in space" to abstract algebraic systems.

## What is a Vector Space?

A **vector space** $V$ over a field $F$ (usually $\\mathbb{R}$ or $\\mathbb{C}$) is a set equipped with two operations:

1. **Vector addition**: $+: V \\times V \\to V$
2. **Scalar multiplication**: $\\cdot: F \\times V \\to V$

These operations must satisfy **eight axioms**.

## The Eight Axioms

For all vectors $\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in V$ and scalars $a, b \\in F$:

### Addition Axioms

1. **Commutativity**: $\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$
2. **Associativity**: $(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})$
3. **Zero vector**: There exists $\\mathbf{0} \\in V$ such that $\\mathbf{v} + \\mathbf{0} = \\mathbf{v}$
4. **Additive inverse**: For each $\\mathbf{v}$, there exists $-\\mathbf{v}$ such that $\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}$

### Scalar Multiplication Axioms

5. **Distributivity (vectors)**: $a(\\mathbf{u} + \\mathbf{v}) = a\\mathbf{u} + a\\mathbf{v}$
6. **Distributivity (scalars)**: $(a + b)\\mathbf{v} = a\\mathbf{v} + b\\mathbf{v}$
7. **Associativity**: $(ab)\\mathbf{v} = a(b\\mathbf{v})$
8. **Identity**: $1\\mathbf{v} = \\mathbf{v}$

## Examples of Vector Spaces

### Example 1: $\\mathbb{R}^n$

The set of all $n$-tuples of real numbers:

$$\\mathbb{R}^n = \\{(x_1, x_2, ..., x_n) : x_i \\in \\mathbb{R}\\}$$

**Operations**:
$$(x_1, ..., x_n) + (y_1, ..., y_n) = (x_1 + y_1, ..., x_n + y_n)$$
$$c(x_1, ..., x_n) = (cx_1, ..., cx_n)$$

This is the most common vector space in applications!

### Example 2: Polynomials

$P_n = $ all polynomials of degree $\\leq n$

**Example in $P_2$**:
$$(3x^2 + 2x + 1) + (x^2 - 4x + 5) = 4x^2 - 2x + 6$$
$$5(x^2 + x + 1) = 5x^2 + 5x + 5$$

### Example 3: Matrices

$M_{m \\times n}(\\mathbb{R}) = $ all $m \\times n$ matrices with real entries

**Example**:
$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix} = \\begin{pmatrix} 6 & 8 \\\\ 10 & 12 \\end{pmatrix}$$

### Example 4: Functions

$F([a,b]) = $ all real-valued functions on $[a,b]$

**Operations**:
$$(f + g)(x) = f(x) + g(x)$$
$$(cf)(x) = c \\cdot f(x)$$

### Example 5: Solutions to Differential Equations

The set of all solutions to $y'' + y = 0$ forms a vector space!

Solutions: $\\{c_1 \\cos(x) + c_2 \\sin(x) : c_1, c_2 \\in \\mathbb{R}\\}$

## Subspaces

A **subspace** $W$ of a vector space $V$ is a subset that is itself a vector space under the same operations.

### Subspace Test

$W \\subseteq V$ is a subspace if and only if:

1. $\\mathbf{0} \\in W$ (contains zero vector)
2. If $\\mathbf{u}, \\mathbf{v} \\in W$, then $\\mathbf{u} + \\mathbf{v} \\in W$ (closed under addition)
3. If $\\mathbf{v} \\in W$ and $c \\in F$, then $c\\mathbf{v} \\in W$ (closed under scalar multiplication)

### Examples of Subspaces

**In $\\mathbb{R}^3$**:
- Lines through the origin
- Planes through the origin
- The origin itself: $\\{\\mathbf{0}\\}$
- All of $\\mathbb{R}^3$

**Not subspaces**:
- Lines not through origin (no zero vector!)
- Positive octant (not closed under scalar multiplication)

## Span and Linear Combinations

A **linear combination** of vectors $\\mathbf{v}_1, ..., \\mathbf{v}_k$ is:

$$c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + ... + c_k\\mathbf{v}_k$$

where $c_i \\in F$ are scalars.

The **span** is the set of all linear combinations:

$$\\text{span}\\{\\mathbf{v}_1, ..., \\mathbf{v}_k\\} = \\{c_1\\mathbf{v}_1 + ... + c_k\\mathbf{v}_k : c_i \\in F\\}$$

### Example

In $\\mathbb{R}^3$, what is $\\text{span}\\{(1,0,0), (0,1,0)\\}$?

All linear combinations:
$$c_1(1,0,0) + c_2(0,1,0) = (c_1, c_2, 0)$$

This is the $xy$-plane!

## Linear Independence

Vectors $\\mathbf{v}_1, ..., \\mathbf{v}_k$ are **linearly independent** if the only solution to:

$$c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + ... + c_k\\mathbf{v}_k = \\mathbf{0}$$

is $c_1 = c_2 = ... = c_k = 0$ (the trivial solution).

Otherwise, they are **linearly dependent**.

### Testing for Independence

**Example**: Are $(1,2,3)$, $(2,4,6)$, $(1,1,1)$ independent in $\\mathbb{R}^3$?

Notice $(2,4,6) = 2(1,2,3)$, so:
$$2(1,2,3) - 1(2,4,6) + 0(1,1,1) = \\mathbf{0}$$

**Not** a trivial solution, so they're **dependent**.

### Geometric Interpretation

- In $\\mathbb{R}^2$: Independent ⟺ not parallel
- In $\\mathbb{R}^3$: Independent ⟺ not coplanar

## Basis and Dimension

A **basis** for vector space $V$ is a set of vectors that:

1. Spans $V$ (every vector can be expressed as a linear combination)
2. Is linearly independent

### Uniqueness of Representation

If $\\{\\mathbf{v}_1, ..., \\mathbf{v}_n\\}$ is a basis, then every $\\mathbf{v} \\in V$ can be written **uniquely** as:

$$\\mathbf{v} = c_1\\mathbf{v}_1 + ... + c_n\\mathbf{v}_n$$

The coefficients $(c_1, ..., c_n)$ are called **coordinates** of $\\mathbf{v}$ with respect to this basis.

### Standard Bases

**In $\\mathbb{R}^3$**:
$$\\mathbf{e}_1 = (1,0,0), \\quad \\mathbf{e}_2 = (0,1,0), \\quad \\mathbf{e}_3 = (0,0,1)$$

**In $P_2$ (polynomials)**:
$$\\{1, x, x^2\\}$$

**In $M_{2\\times2}$**:
$$\\left\\{\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}, \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}, \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix}, \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}\\right\\}$$

### Dimension

The **dimension** of $V$ is the number of vectors in any basis.

**Theorem**: All bases of $V$ have the same number of elements!

**Examples**:
- $\\dim(\\mathbb{R}^n) = n$
- $\\dim(P_n) = n + 1$
- $\\dim(M_{m \\times n}) = mn$

## Linear Transformations

A function $T: V \\to W$ between vector spaces is a **linear transformation** if:

1. $T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ (preserves addition)
2. $T(c\\mathbf{v}) = cT(\\mathbf{v})$ (preserves scalar multiplication)

### Examples

**Rotation in $\\mathbb{R}^2$** by angle $\\theta$:
$$T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$$

**Differentiation** on polynomials:
$$T(p(x)) = p'(x)$$
$$T(ax^2 + bx + c) = 2ax + b$$

**Projection** onto $xy$-plane in $\\mathbb{R}^3$:
$$T(x,y,z) = (x,y,0)$$

### Matrix Representation

Every linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ can be represented by an $m \\times n$ matrix $A$:

$$T(\\mathbf{x}) = A\\mathbf{x}$$

The columns of $A$ are $T(\\mathbf{e}_1), ..., T(\\mathbf{e}_n)$.

## Kernel and Image

For linear transformation $T: V \\to W$:

**Kernel** (null space):
$$\\ker(T) = \\{\\mathbf{v} \\in V : T(\\mathbf{v}) = \\mathbf{0}\\}$$

**Image** (range):
$$\\text{Im}(T) = \\{T(\\mathbf{v}) : \\mathbf{v} \\in V\\}$$

### Rank-Nullity Theorem

$$\\dim(V) = \\dim(\\ker(T)) + \\dim(\\text{Im}(T))$$

This fundamental theorem connects the dimensions!

## Inner Product Spaces

An **inner product** on $V$ is a function $\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{R}$ satisfying:

1. $\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\langle \\mathbf{v}, \\mathbf{u} \\rangle$ (symmetry)
2. $\\langle a\\mathbf{u} + b\\mathbf{v}, \\mathbf{w} \\rangle = a\\langle \\mathbf{u}, \\mathbf{w} \\rangle + b\\langle \\mathbf{v}, \\mathbf{w} \\rangle$ (linearity)
3. $\\langle \\mathbf{v}, \\mathbf{v} \\rangle \\geq 0$ and equals 0 only if $\\mathbf{v} = \\mathbf{0}$ (positive definite)

### Dot Product

In $\\mathbb{R}^n$:
$$\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\mathbf{u} \\cdot \\mathbf{v} = u_1v_1 + u_2v_2 + ... + u_nv_n$$

### Norm (Length)

$$\\|\\mathbf{v}\\| = \\sqrt{\\langle \\mathbf{v}, \\mathbf{v} \\rangle}$$

### Orthogonality

Vectors are **orthogonal** if $\\langle \\mathbf{u}, \\mathbf{v} \\rangle = 0$.

**Orthonormal basis**: Basis where all vectors have length 1 and are mutually orthogonal.

## Applications

### Computer Graphics

- 3D rotations, translations, scaling: linear transformations
- Perspective projection: non-linear, but uses linear algebra
- Lighting calculations: dot products for angles

### Machine Learning

- **Data representation**: Each data point is a vector
- **Principal Component Analysis (PCA)**: Find best low-dimensional subspace
- **Neural networks**: Layers are linear transformations + activation

### Quantum Mechanics

- **State space**: Complex vector space (Hilbert space)
- **Observables**: Linear operators (matrices)
- **Measurement**: Inner products give probabilities

### Differential Equations

- **Solution space**: Vector space
- **General solution**: Linear combination of basis solutions
- **Eigenvectors**: Special solutions with exponential behavior

### Economics

- **Input-output models**: Matrix equations
- **Linear programming**: Optimize over polytopes
- **Markov chains**: Eigenvector for steady state

## Practice Problems

1. Verify that $W = \\{(x, y, z) : x + y + z = 0\\}$ is a subspace of $\\mathbb{R}^3$.

2. Find a basis for $\\text{span}\\{(1,2,3), (2,4,6), (1,1,1)\\}$.

3. Is $T(x,y) = (x+y, 2x-y, xy)$ a linear transformation from $\\mathbb{R}^2$ to $\\mathbb{R}^3$?

4. Find the matrix representation of rotation by $90°$ counterclockwise in $\\mathbb{R}^2$.

## Conclusion

Vector spaces provide the algebraic structure underlying much of modern mathematics and its applications. From the concrete $\\mathbb{R}^n$ to abstract function spaces, the same principles apply:

- **Linearity** is powerful and ubiquitous
- **Basis** gives coordinate systems
- **Dimension** measures "size"
- **Linear transformations** connect spaces

Understanding vector spaces deeply will serve you well in:
- Advanced mathematics (functional analysis, differential geometry)
- Physics (quantum mechanics, general relativity)
- Computer science (algorithms, graphics, ML)
- Engineering (control theory, signal processing)

> "The introduction of numbers as coordinates... is an act of violence." — Hermann Weyl

Yet this "violence" has proven incredibly fruitful, allowing us to solve problems and discover truths that would otherwise remain hidden.`,
    summary: "Understand vector spaces, basis, dimension, and linear transformations with practical examples and applications.",
    coverUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800",
    readTime: 14,
    difficulty: "Intermediate",
    topic: "Algebra",
    authorName: "Prof. David Kim",
    authorRole: "Applied Mathematics Professor",
    createdAt: new Date("2024-02-10"),
  },
];

// Hook for fetching all posts with optional filters
export function usePosts(filters?: PostFilters) {
  // Construct query key based on filters to ensure caching works correctly
  const queryKey = [api.posts.list.path, filters];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        // Build URL with query parameters
        const url = new URL(window.location.origin + api.posts.list.path);
        if (filters?.topic) url.searchParams.set("topic", filters.topic);
        if (filters?.difficulty) url.searchParams.set("difficulty", filters.difficulty);
        if (filters?.search) url.searchParams.set("search", filters.search);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch posts");
        
        // Validate with Zod schema from routes
        return api.posts.list.responses[200].parse(await res.json());
      } catch (error) {
        // Return filtered dummy data when backend is unavailable
        console.log("Using dummy data - backend unavailable");
        let filteredPosts = [...DUMMY_POSTS];
        
        // Apply filters to dummy data
        if (filters?.topic) {
          filteredPosts = filteredPosts.filter(post => post.topic === filters.topic);
        }
        if (filters?.difficulty) {
          filteredPosts = filteredPosts.filter(post => post.difficulty === filters.difficulty);
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchLower) ||
            (post.summary && post.summary.toLowerCase().includes(searchLower))
          );
        }
        
        return filteredPosts;
      }
    },
  });
}

// Hook for fetching a single post by ID
export function usePost(id: number) {
  return useQuery({
    queryKey: [api.posts.get.path, id],
    queryFn: async () => {
      try {
        const url = buildUrl(api.posts.get.path, { id });
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch post");
        
        return api.posts.get.responses[200].parse(await res.json());
      } catch (error) {
        // Return dummy data when backend is unavailable
        console.log("Using dummy data for post ID:", id);
        return DUMMY_POSTS.find(post => post.id === id) || null;
      }
    },
    enabled: !!id,
  });
}

// Hook for fetching a single post by Slug
export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: [api.posts.getBySlug.path, slug],
    queryFn: async () => {
      try {
        const url = buildUrl(api.posts.getBySlug.path, { slug });
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch post");
        
        return api.posts.getBySlug.responses[200].parse(await res.json());
      } catch (error) {
        // Return dummy data when backend is unavailable
        console.log("Using dummy data for slug:", slug);
        return DUMMY_POSTS.find(post => post.slug === slug) || null;
      }
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
