// ============================================================================
// Iteration 4: Full Karaoke Experience
// Motion-Reactive Generative Art System - Final Project
// Generative Computer Graphics – Fall 2025
// ============================================================================
// 
// GENERATIVE METHODS:
// 1. Pose Detection: Uses PoseNet to track human body keypoints
// 2. Silhouette Generation: Connects keypoints to form human outline
// 3. Club Lights: Procedural light animation synced to audio
// 4. Video Recording: Captures frames for export
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
let poseNet;
let poses = [];
let isRecording = false;
let mediaRecorder;
let recordedChunks = [];
let stream;
let clubLights = [];
let numLights = 8;

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
        
        // Initialize pose detection for human silhouette
        setTimeout(() => {
            poseNet = ml5.poseNet(video, poseModelReady);
            poseNet.on('pose', gotPoses);
        }, 1500);
    }
    
    // Initialize club lights
    for (let i = 0; i < numLights; i++) {
        clubLights.push({
            x: (width / numLights) * i + (width / numLights) / 2,
            y: 0,
            intensity: 0,
            color: color(random(360), 80, 90)
        });
    }
    
    // Initial message
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Click to start...", width/2, height/2);
    textSize(16);
    text("(Allows camera & microphone access)", width/2, height/2 + 40);
    textSize(14);
    text("SHIFT: Record | ENTER: Save | SPACE: Clear | S: Screenshot", width/2, height/2 + 60);
}

function modelReady() {
    console.log("Hand pose model ready!");
}

function poseModelReady() {
    console.log("PoseNet model ready!");
}

function gotPoses(results) {
    poses = results;
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
    
    // Draw human silhouette from pose keypoints
    if (poseNet && poses.length > 0) {
        drawHumanSilhouette();
    }
    
    video.loadPixels();
    
    // Motion detection
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
    
    // CLUB LIGHTS: Procedural animation synced to audio
    drawClubLights();
    
    // Video recording is handled by MediaRecorder (no frame capture needed)
    
    // Display recording status
    if (isRecording) {
        fill(255, 0, 0);
        textAlign(LEFT, TOP);
        textSize(16);
        text("● RECORDING", 10, 10);
    }
    
    // Store current frame for next comparison
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

// Heart sign detection algorithm
function detectHeartSign(hands) {
    heartDetected = false;
    
    if (hands && hands.length > 0) {
        for (let hand of hands) {
            if (hand.keypoints && hand.keypoints.length >= 21) {
                let thumbTip = hand.keypoints[4];
                let indexTip = hand.keypoints[8];
                let middleTip = hand.keypoints[12];
                
                if (thumbTip && indexTip && middleTip) {
                    let thumbIndexDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
                    let indexMiddleDist = dist(indexTip.x, indexTip.y, middleTip.x, middleTip.y);
                    
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
        saveCanvas('motion-art-iter4', 'png');
    }
    
    // Video recording controls
    if (keyCode === SHIFT) {
        if (!isRecording) {
            startVideoRecording();
        }
    }
    
    if (keyCode === ENTER) {
        if (isRecording) {
            stopVideoRecording();
        }
    }
}

// Start video recording using MediaRecorder API with audio
function startVideoRecording() {
    try {
        // Get canvas video stream
        let videoStream = canvas.captureStream(30); // 30 FPS
        
        // Get audio stream from microphone
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(function(audioStream) {
                // Combine video and audio streams
                let videoTrack = videoStream.getVideoTracks()[0];
                let audioTrack = audioStream.getAudioTracks()[0];
                
                // Create combined stream
                stream = new MediaStream();
                stream.addTrack(videoTrack);
                stream.addTrack(audioTrack);
                
                // Store audio stream for cleanup
                window.audioStreamForRecording = audioStream;
                
                // Check for supported MIME types (prefer formats that support audio)
                let mimeType = 'video/webm;codecs=vp9,opus';
                if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
                    mimeType = 'video/webm;codecs=vp9,opus';
                } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
                    mimeType = 'video/webm;codecs=vp8,opus';
                } else if (MediaRecorder.isTypeSupported('video/webm')) {
                    mimeType = 'video/webm';
                } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                    mimeType = 'video/mp4';
                }
                
                // Create MediaRecorder with audio
                recordedChunks = [];
                mediaRecorder = new MediaRecorder(stream, {
                    mimeType: mimeType,
                    videoBitsPerSecond: 2500000, // 2.5 Mbps for good quality
                    audioBitsPerSecond: 128000 // 128 kbps for audio
                });
                
                // Handle data available event
                mediaRecorder.ondataavailable = function(event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };
                
                // Handle recording stopped
                mediaRecorder.onstop = function() {
                    saveVideoFile();
                };
                
                // Start recording
                mediaRecorder.start(100); // Collect data every 100ms
                isRecording = true;
                console.log("Recording started with audio... (Format: " + mimeType + ")");
            })
            .catch(function(error) {
                console.error("Error getting audio stream:", error);
                // Fallback: record video only if audio fails
                alert("Could not access microphone. Recording video only.");
                stream = videoStream;
                
                let mimeType = 'video/webm;codecs=vp9';
                if (MediaRecorder.isTypeSupported('video/mp4')) {
                    mimeType = 'video/mp4';
                } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                    mimeType = 'video/webm;codecs=vp9';
                } else if (MediaRecorder.isTypeSupported('video/webm')) {
                    mimeType = 'video/webm';
                }
                
                recordedChunks = [];
                mediaRecorder = new MediaRecorder(stream, {
                    mimeType: mimeType,
                    videoBitsPerSecond: 2500000
                });
                
                mediaRecorder.ondataavailable = function(event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };
                
                mediaRecorder.onstop = function() {
                    saveVideoFile();
                };
                
                mediaRecorder.start(100);
                isRecording = true;
                console.log("Recording started (video only)... (Format: " + mimeType + ")");
            });
    } catch (error) {
        console.error("Error starting video recording:", error);
        alert("Failed to start video recording: " + error.message);
        isRecording = false;
    }
}

// Stop video recording
function stopVideoRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        
        // Stop all tracks (video and audio)
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Stop audio stream if it exists
        if (window.audioStreamForRecording) {
            window.audioStreamForRecording.getTracks().forEach(track => track.stop());
            window.audioStreamForRecording = null;
        }
        
        isRecording = false;
        console.log("Recording stopped. Processing video...");
    }
}

// Save recorded video as MPEG4/webm file
function saveVideoFile() {
    if (recordedChunks.length === 0) {
        alert("No video data recorded!");
        return;
    }
    
    // Create blob from recorded chunks
    const blob = new Blob(recordedChunks, {
        type: mediaRecorder.mimeType
    });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    
    // Determine file extension based on MIME type
    let extension = 'webm';
    if (mediaRecorder.mimeType.includes('mp4')) {
        extension = 'mp4';
    }
    
    a.download = 'motion-art-iter4-' + new Date().getTime() + '.' + extension;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    console.log("Video saved! Format: " + mediaRecorder.mimeType);
    alert("Video recording complete! File saved as " + a.download);
    
    // Reset
    recordedChunks = [];
    mediaRecorder = null;
    stream = null;
}

