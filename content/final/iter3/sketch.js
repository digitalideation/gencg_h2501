// ============================================================================
// Iteration 3: Hand Tracking with Heart Sign Detection
// Motion-Reactive Generative Art System - Final Project
// Generative Computer Graphics – Fall 2025
// ============================================================================
// 
// GENERATIVE METHOD: Machine Learning + Procedural Generation
// - Uses ml5.js HandPose model to detect hand landmarks
// - Analyzes finger positions to detect heart sign gesture (🫶🏻)
// - When heart detected, generates heart-shaped particles instead of dots
// - Combines ML detection with procedural particle generation
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
let handPose;
let heartDetected = false;

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
    
    // Initialize hand tracking (ml5.js)
    if (typeof ml5 !== 'undefined') {
        setTimeout(() => {
            handPose = ml5.handPose({video: video.elt}, modelReady);
        }, 1000);
    }
    
    // Initial message
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Click to start...", width/2, height/2);
    textSize(16);
    text("(Allows camera & microphone access)", width/2, height/2 + 40);
    textSize(14);
    text("Make heart sign (🫶🏻) to generate heart particles!", width/2, height/2 + 60);
}

function modelReady() {
    console.log("Hand pose model ready!");
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
    
    // Update hand detection
    if (handPose && typeof ml5 !== 'undefined') {
        handPose.detect(video, (results) => {
            if (results && results.length > 0) {
                detectHeartSign(results);
            } else {
                heartDetected = false;
            }
        });
    }
    
    // Draw video feed (mirrored for user feedback)
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
    
    video.loadPixels();
    
    // Motion detection (same as Iteration 2)
    for (let y = 0; y < height; y += 10) {
        for (let x = 0; x < width; x += 10) {
            let index = (x + y * width) * 4;
            
            let currentBrightness = (video.pixels[index] + 
                                   video.pixels[index + 1] + 
                                   video.pixels[index + 2]) / 3;
            
            let prevBrightness = (prevFrame.pixels[index] + 
                                prevFrame.pixels[index + 1] + 
                                prevFrame.pixels[index + 2]) / 3;
            
            let diff = abs(currentBrightness - prevBrightness);
            
            if (diff > motionThreshold && particles.length < maxParticles) {
                let mirroredX = width - x;
                
                // GENERATIVE DECISION: Heart particles if gesture detected, else dots
                if (heartDetected) {
                    particles.push(new HeartParticle(mirroredX, y));
                } else if (audioLevel > 0.1) {
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

// Heart sign detection algorithm
function detectHeartSign(hands) {
    heartDetected = false;
    
    if (hands && hands.length > 0) {
        for (let hand of hands) {
            if (hand.keypoints && hand.keypoints.length >= 21) {
                // Get key finger points
                let thumbTip = hand.keypoints[4];
                let indexTip = hand.keypoints[8];
                let middleTip = hand.keypoints[12];
                
                if (thumbTip && indexTip && middleTip) {
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
        this.vel.mult(0.95);
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

// Heart Particle
class HeartParticle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.lifespan = 255;
        this.size = random(15, 25);
    }
    
    update() {
        this.vel.add(this.acc);
        this.vel.mult(0.95);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= 3;
    }
    
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        scale(this.size / 20);
        
        // Draw heart shape using bezier curves
        fill(255, 0, 0, this.lifespan);
        noStroke();
        beginShape();
        vertex(0, 5);
        bezierVertex(-5, -5, -10, -5, -10, 0);
        bezierVertex(-10, 5, 0, 15, 0, 15);
        bezierVertex(0, 15, 10, 5, 10, 0);
        bezierVertex(10, -5, 5, -5, 0, 5);
        endShape();
        pop();
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
        saveCanvas('motion-art-iter3', 'png');
    }
}

