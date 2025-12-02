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

**Code Output:**

```javascript
// Simple Spiral Drawing Machine
// Creates a static spiral pattern with controlled randomness

let angle = 0;
let radius = 0;

function setup() {
    createCanvas(600, 600);
    drawSpiral();
}

function drawSpiral() {
    background(20);
    stroke(255, 150);
    strokeWeight(1);
    noFill();
    
    // Reset variables for new spiral
    angle = 0;
    radius = 0;
    
    // Draw the spiral using beginShape/endShape for smooth curves
    beginShape();
    for (let i = 0; i < 500; i++) {
        // Calculate position using polar coordinates (angle and radius)
        let x = width/2 + cos(angle) * radius;
        let y = height/2 + sin(angle) * radius;
        
        // Add slight randomness to create organic feel
        x += random(-2, 2);
        y += random(-2, 2);
        
        vertex(x, y);
        
        // Increment angle and radius to create outward spiral
        angle += 0.3;
        radius += 0.5;
    }
    endShape();
}

// Click anywhere to regenerate with new random pattern
function mousePressed() {
    drawSpiral();
}
```

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

**Code Output:**

```javascript
// Animated Particle Drawing Machine
// Particles follow mouse and leave trails based on velocity

let particles = [];
let numParticles = 5;

function setup() {
    createCanvas(600, 600);
    background(0);
    
    // Create particle array - each particle is an autonomous agent
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width/2, height/2));
    }
}

function draw() {
    // Create fade effect by drawing semi-transparent background
    fill(0, 20);
    rect(0, 0, width, height);
    
    // Update and draw all particles
    for (let p of particles) {
        p.follow(mouseX, mouseY);  // Seek toward mouse
        p.update();                 // Update position
        p.display();                // Draw trail
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.prevPos = this.pos.copy();
    }
    
    // Steering behavior - particle seeks target
    follow(targetX, targetY) {
        let target = createVector(targetX, targetY);
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(0.3);  // Limit steering force
        this.acc.add(steer);
    }
    
    // Update physics
    update() {
        this.prevPos = this.pos.copy();
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);  // Reset acceleration
    }
    
    // Draw based on velocity
    display() {
        let speed = this.vel.mag();
        // Map speed to color brightness
        let col = map(speed, 0, this.maxSpeed, 100, 255);
        
        stroke(col, 150, 255, 200);
        // Map speed to line thickness
        strokeWeight(map(speed, 0, this.maxSpeed, 1, 3));
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
}

// Click to clear canvas
function mousePressed() {
    background(0);
}
```

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

**Code Output:**

```javascript
// Interactive Pendulum Drawing Machine
// Double pendulum system creates chaotic patterns

let angle1 = Math.PI / 2;  // First arm angle
let angle2 = Math.PI / 2;  // Second arm angle
let angleVel1 = 0;         // Angular velocities
let angleVel2 = 0;
let len1 = 150;            // Arm lengths
let len2 = 150;
let mass1 = 20;            // Bob masses
let mass2 = 20;
let gravity = 1;
let damping = 0.999;       // Friction/energy loss
let cx, cy;                // Center point
let prevX, prevY;          // Previous position for drawing
let drawing = [];

function setup() {
    createCanvas(600, 600);
    cx = width / 2;
    cy = 150;
    background(10);
    stroke(255, 100);
    strokeWeight(1);
}

function draw() {
    // Fade effect for trail
    fill(10, 10);
    rect(0, 0, width, height);
    
    // Double pendulum physics equations (Lagrangian mechanics)
    let num1 = -gravity * (2 * mass1 + mass2) * sin(angle1);
    let num2 = -mass2 * gravity * sin(angle1 - 2 * angle2);
    let num3 = -2 * sin(angle1 - angle2) * mass2;
    let num4 = angleVel2 * angleVel2 * len2 + angleVel1 * angleVel1 * len1 * cos(angle1 - angle2);
    let den = len1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    let angleAcc1 = (num1 + num2 + num3 * num4) / den;
    
    num1 = 2 * sin(angle1 - angle2);
    num2 = angleVel1 * angleVel1 * len1 * (mass1 + mass2);
    num3 = gravity * (mass1 + mass2) * cos(angle1);
    num4 = angleVel2 * angleVel2 * len2 * mass2 * cos(angle1 - angle2);
    den = len2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    let angleAcc2 = (num1 * (num2 + num3 + num4)) / den;
    
    // Update velocities and angles
    angleVel1 += angleAcc1;
    angleVel2 += angleAcc2;
    angleVel1 *= damping;
    angleVel2 *= damping;
    angle1 += angleVel1;
    angle2 += angleVel2;
    
    // Calculate bob positions
    let x1 = cx + len1 * sin(angle1);
    let y1 = cy + len1 * cos(angle1);
    let x2 = x1 + len2 * sin(angle2);
    let y2 = y1 + len2 * cos(angle2);
    
    // Draw pendulum arms
    stroke(100, 100, 150, 100);
    strokeWeight(2);
    line(cx, cy, x1, y1);
    line(x1, y1, x2, y2);
    
    // Draw trail from second bob
    if (prevX !== undefined) {
        stroke(100, 200, 255, 150);
        strokeWeight(1);
        line(prevX, prevY, x2, y2);
    }
    
    prevX = x2;
    prevY = y2;
    
    // Draw bobs
    fill(255, 100, 100);
    noStroke();
    ellipse(x1, y1, mass1, mass1);
    fill(100, 255, 100);
    ellipse(x2, y2, mass2, mass2);
}

// Click to reset with new starting position
function mousePressed() {
    angle1 = map(mouseX, 0, width, 0, TWO_PI);
    angle2 = map(mouseY, 0, height, 0, TWO_PI);
    angleVel1 = 0;
    angleVel2 = 0;
    prevX = undefined;
    prevY = undefined;
    background(10);
}
```

### Exercise 4: Lissajous Curve Drawing Machine (Parametric/Reflection)

This drawing machine creates beautiful parametric curves called Lissajous figures, which result from combining two perpendicular harmonic oscillations. The mouse position controls the frequency ratios, allowing real-time exploration of different curve patterns.

**How it works:**
- Uses parametric equations: x = sin(a*t), y = sin(b*t)
- Mouse X position controls frequency 'a' (1-8 Hz)
- Mouse Y position controls frequency 'b' (1-8 Hz)
- Draws continuous path with fading trail
- Different frequency ratios create different patterns (figure-8, circles, complex loops)
- Click to clear and start fresh

**Machine behavior:**
The Lissajous machine demonstrates how mathematical relationships create visual harmony. When frequencies are in simple ratios (2:1, 3:2, 4:3), curves are closed and symmetric. When ratios are complex, patterns never repeat. This machine lets you "play" mathematical relationships like a musical instrument - each mouse position creates a unique visual tone.

{% raw %}
<iframe src="../content/day04/04/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

**Code Output:**

```javascript
// Lissajous Curve Drawing Machine
// Creates parametric curves based on mouse position

let angle = 0;
let path = [];
let a = 3;  // Frequency for x-axis
let b = 2;  // Frequency for y-axis

function setup() {
    createCanvas(600, 600);
    background(26, 26, 46);
    stroke(100, 200, 255);
    strokeWeight(2);
    noFill();
}

function draw() {
    // Fade background slightly for trail effect
    fill(26, 26, 46, 10);
    rect(0, 0, width, height);
    
    // Map mouse position to frequency values (1-8 Hz)
    a = map(mouseX, 0, width, 1, 8);
    b = map(mouseY, 0, height, 1, 8);
    
    // Calculate point on Lissajous curve using parametric equations
    let x = width/2 + 200 * sin(a * angle);
    let y = height/2 + 200 * sin(b * angle);
    
    // Store path history (limit to 500 points)
    path.push({x: x, y: y});
    if (path.length > 500) {
        path.shift();
    }
    
    // Draw the curve from path history
    stroke(100, 200, 255, 200);
    strokeWeight(2);
    beginShape();
    for (let p of path) {
        vertex(p.x, p.y);
    }
    endShape();
    
    // Draw current drawing point
    fill(255, 100, 100);
    noStroke();
    ellipse(x, y, 8, 8);
    
    angle += 0.05;
}

// Click to clear and reset
function mousePressed() {
    background(26, 26, 46);
    path = [];
    angle = 0;
}
```

### Reflection: From Tools to Machines

These four drawing machines represent a progression from simple to complex:

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

**4. Lissajous Machine (Parametric Harmony):**
- Mathematical relationships between oscillations
- Simple ratios = elegant patterns, complex ratios = infinite variation
- Machine character: harmonic, musical, mathematically beautiful

**Key Learnings:**

**Shift in thinking:** Instead of "draw this line here," I learned to think "create a system that draws according to these rules." The code becomes a collaborator, not just a tool.

**Expressivity over accuracy:** These machines don't draw what I tell them - they interpret input through their own logic. The spiral wobbles, the particles have momentum, the pendulum swings chaotically. This "misunderstanding" creates artistic value.

**Limitations shape output:** Each machine's constraints (spiral speed, particle acceleration, pendulum length) define its character. The restrictions aren't bugs - they're the machine's personality.

**Code as medium:** Traditional drawing uses physical materials (pen, paper). Here, mathematics, physics, and algorithms ARE the material. The drawings couldn't exist without computation.

These exercises demonstrated how generative systems can extend human creativity - I design the rules, but the machine explores possibilities I couldn't imagine or execute manually.
