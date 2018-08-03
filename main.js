var time = 0;
var timeStep = 1/60; // 60 times a second
var agents = [];

function setup() {
  createCanvas(800, 800);
  agents.push(new Agent());
}

function Agent(x = 100, y = 100) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.direction = createVector(1, 0);
  this.angularVelocity = 0;
  this.torque = 0;
  this.scale = createVector(1, 1);
  this.friction = 1;
  this.angularFriction = 1;

  this.update = function() {
    var frictionX = this.velocity.x * (-this.friction);
    var frictionY = this.velocity.y * (-this.friction);
    this.velocity.x += Math.trunc((this.acceleration.x + frictionX)*100000)/100000 * timeStep;
    this.velocity.y += Math.trunc((this.acceleration.y + frictionY)*100000)/100000 * timeStep;
    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;
    this.acceleration = createVector(0, 0);

    this.direction.normalize();
    var angularFrictionC = this.angularVelocity * (-this.angularFriction);
    this.angularVelocity += Math.trunc((this.torque + angularFrictionC)*100000)/100000 * timeStep;
    this.direction.rotate(this.angularVelocity);
    this.torque = 0;

    if (keyIsDown(LEFT_ARROW)) {
      this.torque = (-PI/64);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.torque = (PI/64);
    }
    
    if (keyIsDown(UP_ARROW)) {
      this.acceleration = (p5.Vector.mult(this.direction, 100));
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.acceleration = (p5.Vector.mult(this.direction, -100));
    }

    if (keyIsDown(32)) { // SPACE
      this.acceleration = (p5.Vector.mult(this.direction, 300));
    }
    
    if (keyIsDown(BACKSPACE)) {
      this.acceleration = (p5.Vector.mult(this.direction, -300));
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
