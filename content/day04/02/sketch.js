// Animated Particle Drawing Machine
// Particles follow mouse and leave trails based on velocity

let particles = [];
let numParticles = 5;

function setup() {
    createCanvas(600, 600);
    background(0);
    
    // Create particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width/2, height/2));
    }
}

function draw() {
    // Fade effect
    fill(0, 20);
    rect(0, 0, width, height);
    
    // Update and draw particles
    for (let p of particles) {
        p.follow(mouseX, mouseY);
        p.update();
        p.display();
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
    
    follow(targetX, targetY) {
        let target = createVector(targetX, targetY);
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(0.3);
        this.acc.add(steer);
    }
    
    update() {
        this.prevPos = this.pos.copy();
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    display() {
        let speed = this.vel.mag();
        let col = map(speed, 0, this.maxSpeed, 100, 255);
        
        stroke(col, 150, 255, 200);
        strokeWeight(map(speed, 0, this.maxSpeed, 1, 3));
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
}

// Click to clear
function mousePressed() {
    background(0);
}

