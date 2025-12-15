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

This final project explores the intersection of human movement and generative art through four progressive iterations. Starting with basic motion detection, the system evolves into a full karaoke-style interactive experience. Each iteration builds upon the previous, adding new generative methods and interaction capabilities.

**Core Concept:** The body becomes a paintbrush, movement becomes the medium, and the algorithm becomes the canvas.

**Evolution:** From simple motion-reactive particles to a complete performance capture system with gesture recognition, silhouette tracking, and video recording.

---

## Technical Implementation

### System Overview

The project uses **p5.js** (JavaScript) with webcam capture, progressing through four iterations that demonstrate different generative computer graphics techniques. The system evolves from basic motion detection to advanced machine learning-based gesture recognition and pose tracking.

### Iteration System

The code includes an iteration system where you can switch between versions by changing the `currentIteration` variable (1-4). Each iteration builds upon the previous, adding new generative methods and capabilities.

---

## Iteration 1: Basic Motion Detection with Particle Generation

### Concept
The foundation of the system - motion-reactive particle generation using frame differencing algorithm.

### Generative Method: Frame Differencing
- **Algorithm**: Compares current frame brightness with previous frame pixel-by-pixel
- **Sampling**: Every 10th pixel for performance optimization (reduces 307,200 pixels to ~3,072 samples)
- **Decision Rule**: Motion threshold filters noise - only significant changes create particles
- **Color Generation**: 
  - Silent mode: Random binary choice (black or white)
  - Music mode: Audio-reactive hue mapping using HSB color space

### Key Code (Generative Methods)

```javascript
// MOTION DETECTION: Frame differencing algorithm
// This generative method detects change by comparing pixel brightness values
for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < width; x += 10) {
        let index = (x + y * width) * 4;
        
        // Calculate brightness difference (generative decision point)
        let currentBrightness = (video.pixels[index] + 
                               video.pixels[index + 1] + 
                               video.pixels[index + 2]) / 3;
        
        let prevBrightness = (prevFrame.pixels[index] + 
                            prevFrame.pixels[index + 1] + 
                            prevFrame.pixels[index + 2]) / 3;
        
        let diff = abs(currentBrightness - prevBrightness);
        
        // GENERATIVE RULE: Create particle if motion exceeds threshold
        if (diff > motionThreshold && particles.length < maxParticles) {
            // COLOR GENERATION: Audio-reactive hue mapping
            if (audioLevel > 0.1) {
                let hue = map(audioLevel, 0, 1, 0, 360) + (x + y) % 100;
                particles.push(new ColorParticle(x, y, hue));
            } else {
                // Random binary choice: black or white
                if (random() > 0.5) {
                    particles.push(new Particle(x, y, 0));
                } else {
                    particles.push(new Particle(x, y, 255));
                }
            }
        }
    }
}
```

**Generative Techniques Used:**
- Frame differencing (computer vision)
- Threshold-based decision making
- Random binary selection
- Audio-reactive parameter mapping
- Procedural particle generation

---

## Iteration 2: Fixed Mirroring - Particles Match Movement

### Concept
Fixes the spatial mapping issue where particles appeared on the wrong side. Particles now correctly match the user's actual movement direction.

### Generative Method: Coordinate Transformation
- **Problem**: Video is mirrored for user feedback, but particles were using original coordinates
- **Solution**: Mirror X coordinate when creating particles: `mirroredX = width - x`
- **Result**: When user moves right hand, particles appear on right side (matching real movement)

### Key Code (Generative Methods)

```javascript
if (diff > motionThreshold && particles.length < maxParticles) {
    // FIX: Mirror the X coordinate so particles match actual movement
    // Video is mirrored for display, but particles should match real position
    let mirroredX = width - x;
    
    if (audioLevel > 0.1) {
        let hue = map(audioLevel, 0, 1, 0, 360) + (mirroredX + y) % 100;
        particles.push(new ColorParticle(mirroredX, y, hue));
    } else {
        if (random() > 0.5) {
            particles.push(new Particle(mirroredX, y, 0));
        } else {
            particles.push(new Particle(mirroredX, y, 255));
        }
    }
}
```

**Generative Techniques Used:**
- Coordinate transformation
- Spatial mapping correction
- Same particle generation as Iteration 1

---

## Iteration 3: Hand Tracking with Heart Sign Detection

### Concept
Adds machine learning-based gesture recognition. When the user makes a heart sign (🫶🏻), the system generates heart-shaped particles instead of dots.

### Generative Method: Machine Learning + Procedural Generation
- **ML Model**: ml5.js HandPose model detects 21 hand landmarks
- **Gesture Recognition**: Analyzes finger positions to detect heart sign
- **Conditional Generation**: Heart particles when gesture detected, dots otherwise
- **Combination**: ML detection + procedural particle generation

### Key Code (Generative Methods)

```javascript
// GENERATIVE METHOD: Machine Learning-based Hand Pose Estimation
// - Uses ml5.js HandPose model to detect hand landmarks
// - Analyzes finger positions to detect heart sign gesture (🫶🏻)
// - When heart detected, generates heart-shaped particles instead of dots

function detectHeartSign(hands) {
    heartDetected = false;
    
    if (hands && hands.length > 0) {
        for (let hand of hands) {
            if (hand.keypoints && hand.keypoints.length >= 21) {
                let thumbTip = hand.keypoints[4];
                let indexTip = hand.keypoints[8];
                let middleTip = hand.keypoints[12];
                
                // Check if fingers are in heart position
                let thumbIndexDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
                let indexMiddleDist = dist(indexTip.x, indexTip.y, middleTip.x, middleTip.y);
                
                // Heart sign: thumbs and index fingers close together
                if (thumbIndexDist < 50 && indexMiddleDist > 30) {
                    heartDetected = true;
                    break;
                }
            }
        }
    }
}

// In motion detection loop:
if (heartDetected) {
    particles.push(new HeartParticle(mirroredX, y));
} else {
    // Regular particle generation...
}
```

**Generative Techniques Used:**
- Machine learning (HandPose model)
- Gesture recognition algorithm
- Conditional particle type selection
- Procedural shape generation (heart bezier curves)

---

## Iteration 4: Full Karaoke Experience

### Concept
Complete performance capture system with human silhouette tracking, club lights, and video recording - designed for karaoke-style dance performances.

### Generative Methods

#### 1. Pose Detection & Silhouette Generation
- **Model**: PoseNet (ml5.js) tracks 17 body keypoints
- **Generative Output**: Connects keypoints to form human outline
- **Real-time Tracking**: Silhouette follows movement, creating dynamic line art

#### 2. Club Lights (Procedural Animation)
- **Audio-reactive**: Light intensity and speed synced to music
- **Procedural Generation**: Lights spawn from top, move down, reset
- **Color Generation**: Random HSB colors per light, audio-modulated intensity

#### 3. Video Recording System
- **Frame Capture**: Records canvas frames during performance
- **Export**: Saves as video file for sharing

### Key Code (Generative Methods)

```javascript
// GENERATIVE METHOD 1: Human Silhouette from Pose Keypoints
function drawHumanSilhouette() {
    for (let pose of poses) {
        let skeleton = pose.skeleton;
        
        // Draw lines connecting keypoints (generative outline)
        stroke(255, 200, 0, 200);
        strokeWeight(3);
        
        for (let i = 0; i < skeleton.length; i++) {
            let partA = skeleton[i][0];
            let partB = skeleton[i][1];
            
            // Mirror coordinates to match video
            let x1 = width - partA.x;
            let y1 = partA.y;
            let x2 = width - partB.x;
            let y2 = partB.y;
            
            line(x1, y1, x2, y2);
        }
    }
}

// GENERATIVE METHOD 2: Club Lights (Procedural Animation)
function drawClubLights() {
    for (let i = 0; i < clubLights.length; i++) {
        let light = clubLights[i];
        
        // Audio-reactive intensity
        light.intensity = audioLevel * 255;
        light.y += 2 + audioLevel * 5; // Speed based on music
        
        // Reset when off screen (procedural loop)
        if (light.y > height) {
            light.y = 0;
            light.color = color(random(360), 80, 90); // Random color
        }
        
        // Draw light beam (procedural shape)
        fill(hue(light.color), saturation(light.color), 
             brightness(light.color), light.intensity * 0.3);
        rect(light.x - 20, 0, 40, light.y);
    }
}
```

**Generative Techniques Used:**
- Machine learning (PoseNet)
- Skeleton-based line generation
- Procedural animation loops
- Audio-reactive parameter modulation
- Real-time video frame capture

### Controls (Iteration 4)
- **SPACE**: Clear particles
- **S**: Save screenshot
- **SHIFT**: Start video recording
- **ENTER**: Stop recording and save video

---

## Key Features Across All Iterations

- **Real-time motion tracking** using frame differencing
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

**Iteration-Specific Controls:**
- **Iteration 3**: Make heart sign (🫶🏻) with your hands to generate heart particles
- **Iteration 4**: 
  - **SHIFT**: Start video recording
  - **ENTER**: Stop recording and save
  - **SPACE**: Clear canvas
  - **S**: Save screenshot

---

## Code Documentation

### Switching Between Iterations

The code includes an iteration system. Change the `currentIteration` variable at the top of `sketch.js`:

```javascript
let currentIteration = 1; // Change to 1, 2, 3, or 4
```

### Particle Classes

All iterations use these particle classes with physics simulation:

```javascript
// Basic Particle (Black/White) - Iterations 1 & 2
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
        // Physics simulation with friction
        this.vel.add(this.acc);
        this.vel.mult(0.95);  // Friction
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= 2;  // Fade over time
    }
    
    display() {
        noStroke();
        fill(this.col, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Colorful Particle (Audio-reactive) - All iterations
class ColorParticle {
    constructor(x, y, hue) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.hue = hue % 360;  // HSB color space
        this.lifespan = 255;
    }
    
    display() {
        colorMode(HSB, 360, 100, 100, 255);
        fill(this.hue, 80, 90, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.size);
        colorMode(RGB, 255);
    }
}

// Heart Particle (Iteration 3 & 4)
class HeartParticle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = random(15, 25);
    }
    
    display() {
        // Draw heart shape using bezier curves
        push();
        translate(this.pos.x, this.pos.y);
        scale(this.size / 20);
        fill(255, 0, 0, this.lifespan);
        beginShape();
        vertex(0, 5);
        bezierVertex(-5, -5, -10, -5, -10, 0);
        bezierVertex(-10, 5, 0, 15, 0, 15);
        bezierVertex(0, 15, 10, 5, 10, 0);
        bezierVertex(10, -5, 5, -5, 0, 5);
        endShape();
        pop();
    }
}
```

---

## Design Decisions & Reflection

### Why Four Iterations?

The iterative approach demonstrates the evolution of generative systems:
1. **Iteration 1**: Establishes core generative method (frame differencing)
2. **Iteration 2**: Refines spatial mapping (coordinate transformation)
3. **Iteration 3**: Adds ML-based gesture recognition (hybrid approach)
4. **Iteration 4**: Integrates multiple generative systems (pose tracking, procedural animation, video capture)

Each iteration introduces new generative computer graphics concepts while building on previous foundations.

### Why Motion Detection?

Traditional drawing requires precise hand-eye coordination. This system removes that barrier - anyone can create art through natural movement. Dance becomes drawing, gestures become strokes, and the body becomes the interface.

### Why Black and White (Iteration 1)?

The minimalist palette emphasizes form, movement, and pattern over color. It creates stark contrast and makes the generative nature of the system more apparent. Each dot is a discrete decision made by the algorithm in response to motion.

### Why Particles?

Particles are discrete, countable units that accumulate over time - they make the algorithmic decision-making visible. Each particle represents a moment where the system "decided" to mark that spot based on detected motion.

### Why Machine Learning (Iterations 3 & 4)?

ML models (HandPose, PoseNet) enable gesture recognition and body tracking that would be extremely difficult with traditional computer vision. This demonstrates how modern AI tools can enhance generative art systems.

### Generative vs Interactive

This project sits at the intersection:
- **Interactive**: You control what motions to make
- **Generative**: The system decides where and how many particles to create
- **Collaborative**: The artwork is co-created by human intention and algorithmic interpretation

Neither you nor the code can create the artwork alone - it requires both.

---

## Technical Challenges Solved

1. **Performance**: Processing 640x480 pixels every frame (307,200 pixels) would be too slow
   - **Solution**: Sample every 10th pixel (reduce by 100x) - classic optimization technique

2. **Noise**: Small camera noise creates unwanted particles
   - **Solution**: Motion threshold filters out minor changes - parameter tuning

3. **Particle Overload**: Unlimited particles would crash the browser
   - **Solution**: Cap at 1000 particles, remove old ones - resource management

4. **Visual Feedback**: Hard to see individual particles
   - **Solution**: Vary sizes (3-8px) and use accumulative drawing

5. **Mirroring Issue (Iteration 2)**: Particles appeared on wrong side
   - **Solution**: Coordinate transformation - mirror X when creating particles

6. **Gesture Detection (Iteration 3)**: Recognizing heart sign reliably
   - **Solution**: Distance-based heuristic on hand keypoints - simplified but effective

7. **Real-time Pose Tracking (Iteration 4)**: Smooth silhouette following movement
   - **Solution**: PoseNet model with skeleton connection algorithm

8. **Video Recording (Iteration 4)**: Capturing and exporting video
   - **Solution**: Frame buffer system (full video export requires additional libraries)

---

## Artistic Statement

This project explores how computational systems can extend human expression. Traditional drawing requires learned motor skills and tools. This system democratizes art-making - anyone who can move can create.

The generative aspect is crucial: you cannot predict exactly where particles will appear. You provide intent through movement, but the system interprets and translates that intent into visual marks. This creates a dialogue between human and machine, between intention and interpretation.

The ephemeral nature (particles fade) mirrors dance itself - temporary, performative, existing only in the moment and in documentation.

---

## Future Directions

Potential expansions beyond Iteration 4:
- **Advanced Gesture Recognition**: More hand signs (peace, thumbs up, etc.)
- **Motion Speed Mapping**: Color based on motion speed (slow = blue, fast = red)
- **Particle Trails**: Connect particles to form continuous lines
- **Sound Generation**: Generate music from motion intensity
- **Multi-user Mode**: Multiple users creating collaborative drawings
- **ML Prediction**: Anticipate movements for smoother tracking
- **Full Video Export**: Complete video recording with audio sync
- **AR Filters**: Add virtual effects and filters
- **Social Sharing**: Direct export to social media platforms

---

## Conclusion

This final project demonstrates the core principles of generative computer graphics:
- **Algorithms as creative partners**, not just tools
- **Systems that respond**, creating emergent behavior
- **Rules that generate complexity** from simple inputs
- **Code as artistic medium**, where the program IS the artwork

The project successfully bridges physical movement and digital art, showing how generative systems can create new forms of expression that would be impossible through traditional means.

**Course Learnings Applied:**
- **Week 1-2**: Procedural systems and rule-based art → Frame differencing algorithm
- **Week 3**: Grid-based iteration and patterns → Pixel sampling grid
- **Week 4**: Time-based animation and cycles → Particle physics, club lights animation
- **Week 5**: Drawing machines and mark-making systems → Particle system as drawing machine

**Advanced Techniques:**
- **Machine Learning**: HandPose and PoseNet models for gesture/pose recognition
- **Computer Vision**: Frame differencing, motion detection
- **Procedural Generation**: Particle systems, procedural animation
- **Audio Reactivity**: Real-time audio analysis and parameter mapping
- **Hybrid Systems**: Combining ML, CV, and procedural generation

All synthesized into an interactive, generative, motion-reactive artwork that evolves through four progressive iterations.

