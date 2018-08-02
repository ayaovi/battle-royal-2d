var agents = [];

function setup(){
  createCanvas(800, 800);
  agents.push(new Agent());
}

function updatePosition() {
	agents.forEach(x => {
    x.position.x += x.direction.x * x.velocity.x * 2;
    x.position.y += x.direction.y * x.velocity.y * 2;
  });
}

function Agent(x = 100, y = 100) {
  this.direction = createVector(1, 0);
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.scale = createVector(1, 1);

  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) {
      agents[0].direction.rotate(PI/36);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      agents[0].direction.rotate(-PI/36);
    }
  };

  this.draw = function () {
    translate(this.position.x, this.position.y)
    rotate(this.direction.heading());
    scale(this.scale.x, this.scale.y);
    rect(-5, -5, 10, 10);
    line(0, 0, 0, 10);
  };
}

function draw(){
  background(100);
  agents.forEach(x => x.update());
  agents.forEach(x => {
    push();
    x.draw();
    pop();
  });
  updatePosition();
}