// Classic Analog Clock
// Complex clock with hour, minute, and second hands

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    strokeCap(ROUND);
}

function draw() {
    background(44, 62, 80);
    translate(width/2, height/2);
    
    // Draw clock face
    noFill();
    stroke(255);
    strokeWeight(8);
    circle(0, 0, 400);
    
    // Draw hour markers
    strokeWeight(4);
    for (let i = 0; i < 12; i++) {
        let angle = i * 30;
        let x1 = cos(angle - 90) * 180;
        let y1 = sin(angle - 90) * 180;
        let x2 = cos(angle - 90) * 200;
        let y2 = sin(angle - 90) * 200;
        line(x1, y1, x2, y2);
    }
    
    // Draw minute markers
    strokeWeight(1);
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) { // Skip hour markers
            let angle = i * 6;
            let x1 = cos(angle - 90) * 190;
            let y1 = sin(angle - 90) * 190;
            let x2 = cos(angle - 90) * 200;
            let y2 = sin(angle - 90) * 200;
            line(x1, y1, x2, y2);
        }
    }
    
    // Get current time
    let h = hour();
    let m = minute();
    let s = second();
    
    // Hour hand
    push();
    let hourAngle = map(h % 12, 0, 12, 0, 360) + map(m, 0, 60, 0, 30);
    rotate(hourAngle - 90);
    stroke(255, 100, 100);
    strokeWeight(8);
    line(0, 0, 100, 0);
    pop();
    
    // Minute hand
    push();
    let minuteAngle = map(m, 0, 60, 0, 360) + map(s, 0, 60, 0, 6);
    rotate(minuteAngle - 90);
    stroke(100, 200, 255);
    strokeWeight(6);
    line(0, 0, 150, 0);
    pop();
    
    // Second hand
    push();
    let secondAngle = map(s, 0, 60, 0, 360);
    rotate(secondAngle - 90);
    stroke(255, 200, 50);
    strokeWeight(2);
    line(0, 0, 170, 0);
    pop();
    
    // Center dot
    fill(255);
    noStroke();
    circle(0, 0, 15);
}

