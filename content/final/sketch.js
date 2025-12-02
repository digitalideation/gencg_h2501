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
    prevFrame.loadPixels();
    
    background(255);
    
    // Initial message
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(100);
    text("Allow camera access...", width/2, height/2);
}

function draw() {
    // Check if video is ready
    if (!video || video.width === 0) {
        return;
    }
    
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
                // Create both black and white particles randomly
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
    prevFrame.loadPixels();
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

