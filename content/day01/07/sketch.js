// Simple Digital Clock
// Minimal code to display current time

function setup() {
    createCanvas(600, 300);
    textAlign(CENTER, CENTER);
    textSize(72);
}

function draw() {
    background(0);
    
    // Get current time
    let h = hour();
    let m = minute();
    let s = second();
    
    // Format time as HH:MM:SS
    let timeString = nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2);
    
    // Display time
    fill(0, 255, 0); // Green text
    text(timeString, width/2, height/2);
}

