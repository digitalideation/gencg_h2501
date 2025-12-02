# Week 5

## Drawing Machines

### Lesson 4: Drawing Machines

In this lesson, we explored the concept of using code to create tools that generate or transform drawings. Instead of manually controlling every mark, we design systems with their own rules, behaviors, and character - creating "drawing machines" that produce art through algorithmic logic.

**Key Concepts:**
- Code as a virtual drawing mechanism
- Designing systems that make marks according to rules
- Behaviors: oscillation, orbital motion, physics simulation
- Inputs: mouse, time, randomness
- Constraints: speed limits, boundaries, probability
- Mark-making rules: continuous vs discrete, conditional drawing

**Design Challenge:**
Write a program that expands, augments, distorts, or interprets the act of drawing. The code should behave like a machine with its own rules and character. Create at least 3 original drawings using your tool.

### Exercise 1: Simple Spiral Drawing Machine (Static Image)

This is a minimalist drawing machine that creates organic spiral patterns. The code uses **p5.js** (JavaScript) to generate a single spiral with controlled randomness, producing a unique drawing each time.

**How it works:**
- Starts from the center and spirals outward
- Uses mathematical functions (sin/cos) for circular motion
- Angle increments by 0.3 radians, radius grows by 0.5 pixels per iteration
- Adds random displacement (-2 to +2 pixels) to each point for organic feel
- Creates 500 points to form the complete spiral
- Click to regenerate a new variation

**Machine behavior:**
The "machine" follows a simple rule: expand outward in a spiral while adding slight chaos. This mimics how a physical spirograph might wobble, creating imperfect but aesthetically pleasing curves.

{% raw %}
<iframe src="../content/day04/01/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

### Exercise 2: Animated Particle Drawing Machine (GIF-suitable)

This drawing machine simulates autonomous agents that follow the mouse cursor while creating flowing, velocity-based trails. The system demonstrates emergent behavior through simple rules applied to multiple particles.

**How it works:**
- 5 particles start at the center, each an independent agent
- Particles are attracted to mouse position using steering behaviors
- Movement creates velocity, which determines line color and thickness
- Faster movement = brighter colors and thicker lines
- Trails fade over time, creating ghostly afterimages
- Click to clear the canvas and start fresh

**Machine behavior:**
Each particle "wants" to reach the mouse but has momentum and acceleration limits. They don't teleport instantly but smoothly pursue the target, creating organic, flowing paths. The system is "expressive rather than functional" - it interprets mouse input through physics, not precise tracking.

{% raw %}
<iframe src="../content/day04/02/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

### Exercise 3: Interactive Pendulum Drawing Machine (Complex/Reflection)

This is a complex drawing machine simulating a double pendulum - a chaotic physical system that creates unpredictable, never-repeating patterns. It demonstrates how simple physics rules can generate infinite complexity.

**How it works:**
- Two connected pendulum arms swing from a fixed point
- Physics simulation includes gravity, momentum, and damping
- The end of the second arm draws the trail
- Pendulum motion is chaotic - tiny changes in starting position create completely different patterns
- Click anywhere to reset pendulum with new starting angles based on mouse position
- The system accumulates history, showing the path over time

**Machine behavior:**
The double pendulum is famous in physics for exhibiting chaotic behavior - deterministic but unpredictable. This machine translates physical laws (gravity, angular acceleration, conservation of energy) into visual marks. It's a perfect example of a drawing machine because:
- You set initial conditions (click position)
- The machine executes its own logic (physics)
- The output is unique and unreproducible
- The tool has "character" - it draws in a distinctly chaotic, flowing style

{% raw %}
<iframe src="../content/day04/03/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

### Reflection: From Tools to Machines

These three drawing machines represent a progression from simple to complex:

**1. Spiral Machine (Deterministic + Noise):**
- Simple mathematical rules + controlled randomness
- Produces similar but unique outputs
- Machine character: consistent, geometric, slightly organic

**2. Particle Machine (Autonomous Agents):**
- Multiple independent entities following simple rules
- Emergent behavior from agent interactions
- Machine character: responsive, flowing, velocity-aware

**3. Pendulum Machine (Chaotic Physics):**
- Complex simulation of real physical system
- Butterfly effect - small changes = huge differences
- Machine character: unpredictable, dynamic, organic

**Key Learnings:**

**Shift in thinking:** Instead of "draw this line here," I learned to think "create a system that draws according to these rules." The code becomes a collaborator, not just a tool.

**Expressivity over accuracy:** These machines don't draw what I tell them - they interpret input through their own logic. The spiral wobbles, the particles have momentum, the pendulum swings chaotically. This "misunderstanding" creates artistic value.

**Limitations shape output:** Each machine's constraints (spiral speed, particle acceleration, pendulum length) define its character. The restrictions aren't bugs - they're the machine's personality.

**Code as medium:** Traditional drawing uses physical materials (pen, paper). Here, mathematics, physics, and algorithms ARE the material. The drawings couldn't exist without computation.

These exercises demonstrated how generative systems can extend human creativity - I design the rules, but the machine explores possibilities I couldn't imagine or execute manually.
