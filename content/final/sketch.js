// ============================================================================
// Motion-Reactive Generative Art System - Final Project
// Generative Computer Graphics – Fall 2025
// ============================================================================
// 
// ITERATION SYSTEM: Switch between iterations by changing the currentIteration variable
// Iteration 1: Basic motion detection with particle generation
// Iteration 2: Fixed mirroring - particles match movement direction
// Iteration 3: Hand tracking with heart sign detection
// Iteration 4: Full karaoke experience with video recording, silhouette tracking, and club lights
//
// ============================================================================

let currentIteration = 1; // Change this to 1, 2, 3, or 4 to switch iterations

// ============================================================================
// SHARED VARIABLES (All Iterations)
// ============================================================================
let video;
let prevFrame;
let particles = [];
let motionThreshold = 30;
let maxParticles = 1000;
let mic;
let audioLevel = 0;
let audioStarted = false;

// ============================================================================
// ITERATION 3 & 4: Hand/Pose Tracking Variables
// ============================================================================
let handPose;
let hands = [];
let heartDetected = false;
let poseNet;
let poses = [];

// ============================================================================
// ITERATION 4: Video Recording & Advanced Features
// ============================================================================
let isRecording = false;
let frames = [];
let clubLights = [];
let numLights = 8;

// ============================================================================
// SETUP FUNCTION
// ============================================================================
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
    
    // Initialize iteration-specific features
    // Note: ml5.js must be loaded in HTML before this script
    if (currentIteration >= 3 && typeof ml5 !== 'undefined') {
        // Load ml5.js models for hand tracking (Iteration 3 & 4)
        // Initialize after video is ready
        setTimeout(() => {
            handPose = ml5.handPose({video: video.elt}, modelReady);
        }, 1000);
    }
    
    if (currentIteration >= 4 && typeof ml5 !== 'undefined') {
        // Initialize pose detection for human silhouette (Iteration 4)
        setTimeout(() => {
            poseNet = ml5.poseNet(video, poseModelReady);
            poseNet.on('pose', gotPoses);
        }, 1500);
        
        // Initialize club lights
        for (let i = 0; i < numLights; i++) {
            clubLights.push({
                x: (width / numLights) * i + (width / numLights) / 2,
                y: 0,
                intensity: 0,
                color: color(random(360), 80, 90)
            });
        }
    }
    
    // Initial message
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Click to start...", width/2, height/2);
    textSize(16);
    text("(Allows camera & microphone access)", width/2, height/2 + 40);
    if (currentIteration >= 4) {
        textSize(14);
        text("SHIFT: Record | ENTER: Save | SPACE: Clear | S: Screenshot", width/2, height/2 + 60);
    }
}

// ============================================================================
// ITERATION 3 & 4: Model Ready Callbacks
// ============================================================================
function modelReady() {
    console.log("Hand pose model ready!");
}

function poseModelReady() {
    console.log("PoseNet model ready!");
}

function gotPoses(results) {
    poses = results;
}

// ============================================================================
// MOUSE PRESSED - Start Audio
// ============================================================================
function mousePressed() {
    if (!audioStarted) {
        mic = new p5.AudioIn();
        mic.start();
        audioStarted = true;
    }
}

// ============================================================================
// DRAW FUNCTION - Main Loop
// ============================================================================
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
    
    // ========================================================================
    // ITERATION 1: Basic Motion Detection with Particle Generation
    // ========================================================================
    if (currentIteration === 1) {
        drawIteration1();
    }
    
    // ========================================================================
    // ITERATION 2: Fixed Mirroring - Particles Match Movement
    // ========================================================================
    else if (currentIteration === 2) {
        drawIteration2();
    }
    
    // ========================================================================
    // ITERATION 3: Hand Tracking with Heart Sign Detection
    // ========================================================================
    else if (currentIteration === 3) {
        drawIteration3();
    }
    
    // ========================================================================
    // ITERATION 4: Full Karaoke Experience
    // ========================================================================
    else if (currentIteration === 4) {
        drawIteration4();
    }
    
    // Display iteration info
    displayIterationInfo();
}

// ============================================================================
// ITERATION 1: Basic Motion Detection
// ============================================================================
// GENERATIVE METHOD: Frame Differencing Algorithm
// - Compares current frame brightness with previous frame
// - Uses pixel-by-pixel comparison (sampled every 10px for performance)
// - Motion threshold filters noise, creating particles only at significant changes
// - This is a classic computer vision technique for motion detection
function drawIteration1() {
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
    
    updateAndDisplayParticles();
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
    prevFrame.loadPixels();
}

// ============================================================================
// ITERATION 2: Fixed Mirroring Issue
// ============================================================================
// GENERATIVE METHOD: Same as Iteration 1, but with coordinate transformation
// - Particles are created at mirrored positions to match user's actual movement
// - When user moves right hand, particles appear on right side (not left)
// - Uses coordinate transformation: mirroredX = width - x
function drawIteration2() {
    video.loadPixels();
    
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
        }
    }
    
    updateAndDisplayParticles();
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
    prevFrame.loadPixels();
}

// ============================================================================
// ITERATION 3: Hand Tracking with Heart Sign Detection
// ============================================================================
// GENERATIVE METHOD: Machine Learning-based Hand Pose Estimation
// - Uses ml5.js HandPose model to detect hand landmarks
// - Analyzes finger positions to detect heart sign gesture (🫶🏻)
// - When heart detected, generates heart-shaped particles instead of dots
// - Combines ML detection with procedural particle generation
function drawIteration3() {
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
    
    // Motion detection (same as Iteration 2)
    video.loadPixels();
    
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
    
    updateAndDisplayParticles();
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
    prevFrame.loadPixels();
}

// Heart sign detection algorithm
function detectHeartSign(hands) {
    heartDetected = false;
    
    if (hands && hands.length > 0) {
        for (let hand of hands) {
            if (hand.keypoints && hand.keypoints.length >= 21) {
                // Get key finger points (simplified detection)
                // Heart sign: thumbs and index fingers form heart shape
                let thumbTip = hand.keypoints[4];
                let indexTip = hand.keypoints[8];
                let middleTip = hand.keypoints[12];
                
                // Check if fingers are in heart position
                // (This is a simplified heuristic - can be refined)
                if (thumbTip && indexTip && middleTip) {
                    let thumbIndexDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
                    let indexMiddleDist = dist(indexTip.x, indexTip.y, middleTip.x, middleTip.y);
                    
                    // Heart sign: thumbs and index fingers close together, forming V shape
                    if (thumbIndexDist < 50 && indexMiddleDist > 30) {
                        heartDetected = true;
                        break;
                    }
                }
            }
        }
    }
}

// ============================================================================
// ITERATION 4: Full Karaoke Experience
// ============================================================================
// GENERATIVE METHODS:
// 1. Pose Detection: Uses PoseNet to track human body keypoints
// 2. Silhouette Generation: Connects keypoints to form human outline
// 3. Club Lights: Procedural light animation synced to audio
// 4. Video Recording: Captures frames for export
function drawIteration4() {
    // Update pose detection
    if (poseNet && poses.length > 0) {
        drawHumanSilhouette();
    }
    
    // Motion detection with particles
    video.loadPixels();
    
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
        }
    }
    
    updateAndDisplayParticles();
    
    // CLUB LIGHTS: Procedural animation synced to audio
    drawClubLights();
    
    // Record frame if recording
    if (isRecording) {
        frames.push(get());
    }
    
    prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
    prevFrame.loadPixels();
}

// Draw human silhouette from pose keypoints
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
        
        // Draw keypoints
        fill(255, 100, 0);
        noStroke();
        for (let keypoint of pose.keypoints) {
            if (keypoint.score > 0.2) {
                let x = width - keypoint.x;
                let y = keypoint.y;
                ellipse(x, y, 8, 8);
            }
        }
    }
}

// Club lights animation (procedural generation)
function drawClubLights() {
    // Update light intensity based on audio
    for (let i = 0; i < clubLights.length; i++) {
        let light = clubLights[i];
        
        // Audio-reactive intensity
        light.intensity = audioLevel * 255;
        light.y += 2 + audioLevel * 5; // Speed based on music
        
        // Reset when off screen
        if (light.y > height) {
            light.y = 0;
            light.color = color(random(360), 80, 90);
        }
        
        // Draw light beam
        push();
        colorMode(HSB, 360, 100, 100);
        let c = light.color;
        fill(hue(c), saturation(c), brightness(c), light.intensity * 0.3);
        noStroke();
        rect(light.x - 20, 0, 40, light.y);
        
        // Light source
        fill(hue(c), saturation(c), brightness(c), light.intensity);
        ellipse(light.x, light.y, 30, 30);
        pop();
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function updateAndDisplayParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

function displayIterationInfo() {
    fill(255, 200);
    textAlign(LEFT, TOP);
    textSize(12);
    text("Iteration " + currentIteration, 10, 10);
    if (currentIteration >= 4 && isRecording) {
        fill(255, 0, 0);
        text("● RECORDING", 10, 30);
    }
}

// ============================================================================
// PARTICLE CLASSES
// ============================================================================

// Basic Particle (Black/White)
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

// Heart Particle (Iteration 3 & 4)
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

// ============================================================================
// KEYBOARD CONTROLS
// ============================================================================
function keyPressed() {
    // Space: Clear particles
    if (key === ' ') {
        particles = [];
    }
    
    // S: Save screenshot
    if (key === 's' || key === 'S') {
        saveCanvas('motion-art-iter' + currentIteration, 'png');
    }
    
    // Iteration 4: Video recording controls
    if (currentIteration === 4) {
        // Shift: Start recording
        if (keyCode === SHIFT) {
            if (!isRecording) {
                isRecording = true;
                frames = [];
                console.log("Recording started...");
            }
        }
        
        // Enter: Stop recording and save
        if (keyCode === ENTER) {
            if (isRecording) {
                isRecording = false;
                saveVideo();
                console.log("Recording stopped. Saving...");
            }
        }
    }
}

// Save recorded video frames
function saveVideo() {
    if (frames.length === 0) {
        alert("No frames recorded!");
        return;
    }
    
    // Note: p5.js doesn't have built-in video export
    // For full video export, you would need:
    // 1. CCapture.js library: https://github.com/spite/ccapture.js
    // 2. Or MediaRecorder API (browser-native)
    
    console.log("Saving " + frames.length + " frames...");
    
    // Save frames as individual images (workaround)
    for (let i = 0; i < frames.length; i++) {
        frames[i].save('frame_' + nf(i, 4) + '.png');
    }
    
    alert("Video recording complete! " + frames.length + " frames saved as PNG images.\n" +
          "To create a video, use a tool like FFmpeg or import frames into video editing software.\n" +
          "For automatic video export, add CCapture.js library.");
}
