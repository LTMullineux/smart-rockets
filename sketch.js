let population;
let lifeSpan = 700;
let populationSize = 300;
let count;
let target;
let maxForce;
let targetR = 50;
let vecMag = 0.3;
let popDecrease = 0.95;

// obstacle dimensions
let rx;
let ry;
let rw;
let rh;

function setup() {
  //createCanvas(550, 400);
  createCanvas(windowWidth,windowHeight);
  population = new Population();
  count = 0;
  target = createVector(width / 2, 50);
  maxForce = 0.2;

  // obstacle dimensions
  rx = width / 3;
  ry = height / 2;
  rw = width / 3;
  rh = 10;
}

function draw() {
  background(0);

  // draw target/moom
  fill(180);
  noStroke();
  ellipse(target.x, target.y, targetR, targetR);

  // draw craters on moon
  let crater = floor(targetR*0.2)
  noStroke();
  fill(150);
  ellipse(target.x + crater, target.y + 3, crater, crater);
  ellipse(target.x - crater, target.y + crater, crater, crater);
  ellipse(target.x - crater, target.y - crater, crater, crater);

  // run current population and tick up count
  population.run();
  count++;

  // obstacle
  fill(255);
  rect(rx, ry, rw, rh);

  // at end of lifeSpan run GA
  if (count == lifeSpan) {
    population.fitness();
    population.selection();
    count = 0;
  }
}
