// ============================================================================
// Iteration 1: Basic Motion Detection with Particle Generation
// Motion-Reactive Generative Art System - Final Project
// Generative Computer Graphics – Fall 2025
// ============================================================================
// 
// GENERATIVE METHOD: Frame Differencing Algorithm
// - Compares current frame brightness with previous frame pixel-by-pixel
// - Uses pixel-by-pixel comparison (sampled every 10px for performance)
// - Motion threshold filters noise, creating particles only at significant changes
// - This is a classic computer vision technique for motion detection
//
// ============================================================================

let video;
let prevFrame;
let particles = [];
let motionThreshold = 30;
let maxParticles = 1000;
let mic;
let audioLevel = 0;
let audioStarted = false;

function setup() {
    createCanvas(640, 480);
    
    // Initialize webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    
    // Create previous frame buffer for motion detection
    prevFrame = createImage(width, height);
    prevFrame.loadPixels();
    
    background(0);
    
    // Initial message
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Click to start...", width/2, height/2);
    textSize(16);
    text("(Allows camera & microphone access)", width/2, height/2 + 40);
}

function mousePressed() {
    if (!audioStarted) {
        mic = new p5.AudioIn();
        mic.start();
        audioStarted = true;
    }
}

function draw() {
    if (!video || video.width === 0) return;
    
    // Get audio level
    if (audioStarted && mic) {
        audioLevel = mic.getLevel();
    }
    
    // Draw video feed (mirrored for user feedback)
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
    
    video.loadPixels();
    
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
    
    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
    
    // Store current frame for next comparison
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
    prevFrame.loadPixels();
}

// Particle class with physics (Black/White)
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
        this.vel.add(this.acc);
        this.vel.mult(0.95); // Friction
        this.pos.add(this.vel);
        this.acc.mult(0);
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

// Colorful Particle (Audio-reactive)
class ColorParticle {
    constructor(x, y, hue) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.acc = createVector(0, 0);
        this.lifespan = 255;
        this.hue = hue % 360;
        this.size = random(4, 10);
    }
    
    update() {
        this.vel.add(this.acc);
        this.vel.mult(0.95);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= 2;
    }
    
    display() {
        colorMode(HSB, 360, 100, 100, 255);
        noStroke();
        fill(this.hue, 80, 90, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.size);
        colorMode(RGB, 255);
    }
    
    isDead() {
        return this.lifespan <= 0;
    }
}

// Keyboard controls
function keyPressed() {
    if (key === ' ') {
        particles = [];
    }
    if (key === 's' || key === 'S') {
        saveCanvas('motion-art-iter1', 'png');
    }
}

