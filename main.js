var time = 0;
var timeStep = 1/60; // 60 times a second
var agents = [];

function setup() {
  createCanvas(800, 800);
  agents.push(new Agent());
}

function Agent(x = 100, y = 100) {
  this.direction = createVector(1, 0);
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.scale = createVector(1, 1);

  this.update = function() {
    this.direction.normalize();
    this.velocity.x += this.acceleration.x * timeStep;
    this.velocity.y += this.acceleration.y * timeStep;
    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;
    this.acceleration = createVector(0, 0);

 
    if (keyIsDown(LEFT_ARROW)) {
      this.direction.rotate(-PI/36);
    }

     if (keyIsDown(RIGHT_ARROW)) {
      this.direction.rotate(PI/36);
    }

    if (keyIsDown(UP_ARROW)) {
      this.acceleration = (p5.Vector.mult(this.direction, 10));
    }

     if (keyIsDown(DOWN_ARROW)) {
      this.acceleration = (p5.Vector.mult(this.direction, -10));
    }
    else{
      //this.acceleration = createVector(0, 0);
    }
  };

  this.draw = function () {
    translate(this.position.x, this.position.y)
    rotate(this.direction.heading());
    scale(this.scale.x, this.scale.y);
    rect(-5, -5, 10, 10);
    line(0, 0, 10, 0);
  };
}

function draw(){
  background(100);
  var currentTime = millis() / 1000;

  while(time < currentTime) {
    agents.forEach(x => x.update());
    time += timeStep;
  }
  agents.forEach(x => {
    push();
    x.draw();
    pop();
  });
}