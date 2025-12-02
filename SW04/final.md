---
layout: default
title: Final Project
nav_order: 7
---

# Final Project

## Motion-Reactive Generative Art

### Generative Computer Graphics – Fall 2025

Final Project: Interactive Webcam-Based Generative System

---

## Project Concept

This final project explores the intersection of human movement and generative art. Using webcam-based motion detection, the system creates a dynamic visual composition where black and white particles respond to and follow the user's movements in real-time. The artwork is co-created by the algorithm and the performer, making each interaction unique and unrepeatable.

**Core Concept:** The body becomes a paintbrush, movement becomes the medium, and the algorithm becomes the canvas.

---

## Technical Implementation

### System Overview

The project uses **p5.js** (JavaScript) with webcam capture and pixel-based motion detection to create a generative particle system that responds to movement.

**How it works:**
1. **Motion Detection**: Webcam captures live video feed
2. **Analysis**: Compares current frame with previous frame to detect areas of change
3. **Audio Detection**: Microphone captures sound levels (music, voice, ambient noise)
4. **Generation**: Creates particles at motion hotspots
5. **Color Mode Switching**: 
   - Silent: Black and white particles
   - With Music/Sound: Colorful particles with hues based on audio level
6. **Behavior**: Particles follow movement trails, creating organic patterns
7. **Visual Output**: Particles accumulate over live video feed, forming a generative drawing

### Key Features

- **Real-time motion tracking** without requiring external libraries
- **Audio reactivity** using microphone input (p5.sound library)
- **Dual mode system**: 
  - Silent mode: Black and white minimalist particles
  - Music mode: Colorful particles with audio-reactive hues
- **Particle system** with 1000+ simultaneous particles
- **Organic movement patterns** using physics simulation
- **Live video feed** - see yourself while creating art
- **Accumulative drawing** - movements leave trails over video
- **Performance optimized** for smooth real-time interaction

---

## The Interactive Experience

{% raw %}
<iframe src="../content/final/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

**Instructions:**
1. **Click anywhere** to start the experience (allows camera & mic access)
2. **Move in front of the camera** - dance, wave, gesture
3. Watch as **black and white particles** are born from your movements
4. **Play music** or make sound - particles become **colorful** and audio-reactive
5. **Louder sound** = more vibrant colors and faster particle generation
6. Fast movements create more particles
7. Particles gradually fade, creating ghostly trails over your live video
8. Press **SPACEBAR** to clear particles and start fresh
9. Press **'S'** to save your generative artwork as PNG

---

## Code Documentation

### Main Sketch Structure

```javascript
// Motion-Reactive Generative Particle System
// Final Project - Generative Computer Graphics Fall 2025

let video;
let prevFrame;
let particles = [];
let motionThreshold = 30;
let maxParticles = 1000;

function setup() {
    createCanvas(640, 480);
    
    // Initialize webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    
    // Create previous frame buffer
    prevFrame = createImage(width, height);
    
    background(255);
}

function draw() {
    // Load current video frame
    video.loadPixels();
    prevFrame.loadPixels();
    
    // Detect motion by comparing pixels
    for (let y = 0; y < height; y += 10) {
        for (let x = 0; x < width; x += 10) {
            let index = (x + y * width) * 4;
            
            // Get current and previous brightness
            let currentBrightness = (video.pixels[index] + 
                                   video.pixels[index + 1] + 
                                   video.pixels[index + 2]) / 3;
            
            let prevBrightness = (prevFrame.pixels[index] + 
                                prevFrame.pixels[index + 1] + 
                                prevFrame.pixels[index + 2]) / 3;
            
            // Calculate motion magnitude
            let diff = abs(currentBrightness - prevBrightness);
            
            // If significant motion detected, create particles
            if (diff > motionThreshold && particles.length < maxParticles) {
                // Create both black and white particles
                if (random() > 0.5) {
                    particles.push(new Particle(x, y, 0));    // Black
                } else {
                    particles.push(new Particle(x, y, 255));  // White
                }
            }
        }
    }
    
    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        
        // Remove dead particles
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
    
    // Store current frame for next comparison
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
}

// Particle class with physics
class Particle {
    constructor(x, y, col) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.lifespan = 255;
        this.col = col;
        this.size = random(3, 8);
    }
    
    update() {
        // Physics simulation
        this.vel.add(this.acc);
        this.vel.mult(0.95);  // Friction
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        // Fade over time
        this.lifespan -= 2;
    }
    
    display() {
        noStroke();
        fill(this.col, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
    isDead() {
        return this.lifespan <= 0;
    }
}

// Clear canvas
function keyPressed() {
    if (key === ' ') {
        background(255);
        particles = [];
    }
    if (key === 's' || key === 'S') {
        saveCanvas('motion-art', 'png');
    }
}
```

---

## Design Decisions & Reflection

### Why Motion Detection?

Traditional drawing requires precise hand-eye coordination. This system removes that barrier - anyone can create art through natural movement. Dance becomes drawing, gestures become strokes, and the body becomes the interface.

### Why Black and White?

The minimalist palette emphasizes form, movement, and pattern over color. It creates stark contrast and makes the generative nature of the system more apparent. Each dot is a discrete decision made by the algorithm in response to motion.

### Why Particles?

Particles are discrete, countable units that accumulate over time - they make the algorithmic decision-making visible. Each particle represents a moment where the system "decided" to mark that spot based on detected motion.

### Generative vs Interactive

This project sits at the intersection:
- **Interactive**: You control what motions to make
- **Generative**: The system decides where and how many particles to create
- **Collaborative**: The artwork is co-created by human intention and algorithmic interpretation

Neither you nor the code can create the artwork alone - it requires both.

---

## Technical Challenges Solved

1. **Performance**: Processing 640x480 pixels every frame (307,200 pixels) would be too slow
   - **Solution**: Sample every 10th pixel (reduce by 100x)

2. **Noise**: Small camera noise creates unwanted particles
   - **Solution**: Motion threshold filters out minor changes

3. **Particle Overload**: Unlimited particles would crash the browser
   - **Solution**: Cap at 1000 particles, remove old ones

4. **Visual Feedback**: Hard to see individual particles
   - **Solution**: Vary sizes (3-8px) and use accumulative drawing

---

## Artistic Statement

This project explores how computational systems can extend human expression. Traditional drawing requires learned motor skills and tools. This system democratizes art-making - anyone who can move can create.

The generative aspect is crucial: you cannot predict exactly where particles will appear. You provide intent through movement, but the system interprets and translates that intent into visual marks. This creates a dialogue between human and machine, between intention and interpretation.

The ephemeral nature (particles fade) mirrors dance itself - temporary, performative, existing only in the moment and in documentation.

---

## Future Directions

Potential expansions:
- Color based on motion speed (slow = blue, fast = red)
- Particle trails that connect to form lines
- Sound generation from motion intensity
- Multiple users creating collaborative drawings
- Machine learning to predict and anticipate movements
- Export as animation/GIF showing the creation process

---

## Conclusion

This final project demonstrates the core principles of generative computer graphics:
- **Algorithms as creative partners**, not just tools
- **Systems that respond**, creating emergent behavior
- **Rules that generate complexity** from simple inputs
- **Code as artistic medium**, where the program IS the artwork

The project successfully bridges physical movement and digital art, showing how generative systems can create new forms of expression that would be impossible through traditional means.

**Course Learnings Applied:**
- Week 1-2: Procedural systems and rule-based art
- Week 3: Grid-based iteration and patterns
- Week 4: Time-based animation and cycles
- Week 5: Drawing machines and mark-making systems

All synthesized into an interactive, generative, motion-reactive artwork.

