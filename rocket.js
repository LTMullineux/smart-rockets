// Rocket class
function Rocket(dna) {
  // rocket physics
  this.pos = createVector(width / 2, height);
  this.vel = createVector(0, 0);
  this.acc = createVector();
  this.targetHit = false;
  this.targetTime = 0;
  this.crashed = false;
  this.color = "#afaaaa";

  // fitness value of rocket
  this.fitness = 0;

  // if DNA passed on use it
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  // --------------------------------------
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  // --------------------------------------
  // update the physics of a rocket given conditions
  this.update = function() {
    // tick up time to target
    this.targetTime++;

    // check if rocket hits obstacle
    if (this.pos.x > rx && this.pos.x < rx + rw) {
      if (this.pos.y > ry && this.pos.y < ry + rh) {
        this.crashed = true;
        this.color = "#c90000";
      }
    }

    // check if rocket hits edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.crashed = true;
      this.color = "#c90000";
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.crashed = true;
      this.color = "#c90000";
    }

    // check if rockets has hit target
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < targetR) {
      this.targetHit = true;
      this.pos = target.copy();
      this.color = "#0ac900";
    }

    // only update physics if target not hit target or not crashed
    this.applyForce(this.dna.genes[count]);
    if (!this.targetHit && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(7);
    }
  }

  // --------------------------------------
  // fitness function = f(distance to target, flight time)
  this.fitness = function() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);

    // encorparate target time
    this.fitness = pow(this.fitness, 1 / (this.targetTime + 1));

    // if rocket hits target increase fitness
    if (this.targetHit) {
      this.fitness *= 10;
    }

    // if crashed then decrease fitness
    if (this.crashed) {
      this.fitness /= 10
    }
  }

  // --------------------------------------
  // render a rocket
  this.show = function() {
    // push and pop to apply translate/rotate
    // ... to each rocket
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI / 2);
    rectMode(CENTER);
    noStroke();
    this.renderRocket(1);
    pop();
  }

  this.renderRocket = function(s) {
    noStroke();

    // rocket body ---------------------------
    fill(this.color);
    rect(-s, 4 * s, 6 * s, 14 * s);
    rect(-3.5 * s, 12 * s, 1 * s, 2 * s);
    rect(1.5 * s, 12 * s, 1 * s, 2 * s);
    rect(3 * s, 6 * s, 2 * s, 8 * s);

    // rocket window
    fill(51, 175);
    rect(0, 0, 4 * s, 4 * s);

    // flames
    if (!this.crashed && !this.targetHit) {
      fill(249, 122, 25);
      rect(1.5 * s, 20 * s, 5 * s, 15 * s);
    }
  }
}
