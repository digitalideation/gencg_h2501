# Week 3

## Grids & Patterns

### Lesson 3: Grids and Iterative Patterns

In this lesson, I explored structured generative systems and learned how to create tiling patterns and textural compositions. The focus was on understanding how simple rules and iterations can create complex visual outcomes, balancing order and randomness, symmetry, rhythm, and color.

**Key Concepts:**
- Creating grid-based patterns
- Using nested iterations
- Balancing geometric and organic forms
- Making patterns infinitely tileable
- Working with randomness within structured systems

### Exercise 1: Animated Random Lines Pattern

This animated pattern demonstrates how random lines can create dynamic, organic textures within a structured grid system. The code uses **JavaScript** with **p5.js** to generate random lines that appear and fade, creating a constantly evolving visual pattern.

**How it works:**
- A 20x20 grid structure provides the foundation
- Each frame, random lines are drawn in grid cells with a 5% probability
- Lines fade over time using a semi-transparent overlay, creating trailing effects
- The pattern continuously evolves, making it suitable for GIF export
- Minimal code (under 40 lines) demonstrates how simple rules create complex visual outcomes

{% raw %}
<iframe src="../content/day01/05/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

**Reference:**
- **Animated Line Patterns**: Similar animated line-based generative patterns can be found in works by artists exploring grid-based animation systems. The technique of using probability-based line generation within grid structures is commonly used in generative art to create organic, evolving textures. ([OpenProcessing: Animated Grid Patterns](https://www.openprocessing.org/browse/?q=animated+grid+lines))
- **Fading Trails Technique**: The technique of using semi-transparent overlays to create fading trails is widely used in generative art, similar to approaches seen in particle systems and motion graphics. This creates a sense of temporal accumulation and movement.

### Exercise 2: Static Black/White Geometric Pattern

This static pattern explores the relationship between order and randomness using only black and white geometric shapes. The composition demonstrates how simple binary choices (black/white, circle/square) can create visually interesting tiling patterns.

**How it works:**
- A 12x12 grid structure organizes the composition
- Each cell randomly contains either a black or white shape
- Shapes alternate between circles and squares randomly
- The pattern uses a fixed random seed, making it reproducible
- Click to regenerate a new pattern with different randomness
- The minimal color palette (black/white) emphasizes form and contrast

{% raw %}
<iframe src="../content/day02/01/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

**Reference:**
- **Minimal Geometric Patterns**: This work draws inspiration from minimalist geometric art movements, particularly the use of binary choices (black/white, circle/square) to create complex patterns. Similar approaches can be seen in works by artists like Josef Albers, who explored the relationship between simple geometric forms and color. ([Wikipedia: Josef Albers](https://en.wikipedia.org/wiki/Josef_Albers))
- **Grid-Based Binary Art**: The concept of using binary choices within grid structures to generate patterns is reminiscent of early computer art and algorithmic composition, where simple rules create visual complexity. This approach shares similarities with works by artists exploring systematic variations in minimal compositions.

### Reflection

These exercises taught me how structured systems (grids) combined with controlled randomness can generate infinite variations. The key was finding the right balance: too much randomness creates chaos, while too much structure becomes repetitive. Both patterns demonstrate how minimal code can produce complex visual results, reinforcing the power of algorithmic thinking in generative art.
