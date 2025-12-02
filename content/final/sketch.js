// Motion-Reactive Generative Particle System with Audio
// Final Project - Generative Computer Graphics Fall 2025

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
    
    // Create previous frame buffer
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
        // Initialize microphone
        mic = new p5.AudioIn();
        mic.start();
        audioStarted = true;
    }
}

function draw() {
    // Check if video is ready
    if (!video || video.width === 0) {
        return;
    }
    
    // Get audio level if mic is active
    if (audioStarted && mic) {
        audioLevel = mic.getLevel();
    }
    
    // Draw video feed in background so user can see themselves
    push();
    translate(width, 0);
    scale(-1, 1); // Mirror the video
    image(video, 0, 0, width, height);
    pop();
    
    // Load current video frame
    video.loadPixels();
    
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
                // If audio level is high (music playing), create colorful particles
                if (audioLevel > 0.1) {
                    // Colorful particles - hue based on audio level and position
                    let hue = map(audioLevel, 0, 1, 0, 360) + (x + y) % 100;
                    particles.push(new ColorParticle(x, y, hue));
                } else {
                    // Create both black and white particles randomly (silent mode)
                    if (random() > 0.5) {
                        particles.push(new Particle(x, y, 0));    // Black
                    } else {
                        particles.push(new Particle(x, y, 255));  // White
                    }
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

// Colorful particle class (for music mode)
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
        // Physics simulation
        this.vel.add(this.acc);
        this.vel.mult(0.95);  // Friction
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        // Fade over time
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

// Clear canvas
function keyPressed() {
    if (key === ' ') {
        particles = [];
    }
    if (key === 's' || key === 'S') {
        saveCanvas('motion-art', 'png');
    }
}

