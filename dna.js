// Rocket class
function DNA(genes) {
  // if genes passed on, else random
  if (genes) {
    this.genes = genes;
  }
  // if no genes then create new random dna
  else {
    this.genes = [];
    for (let i = 0; i < lifeSpan; i++) {
      // give the rockets an initial lift
      if (i < 5) {
        this.genes[i] = createVector(random(-1, 1), -1);
      } else {
        this.genes[i] = p5.Vector.random2D();
      }
      this.genes[i].setMag(vecMag);
    }
  }

  // -------------------------------------
  // crossover parents DNA at random splice point
  this.crossover = function(partner) {
    let newGenes = [];

    // Picks random midpoint
    let splicePoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > splicePoint) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    // return new DNA object
    return new DNA(newGenes);
  }

  // -------------------------------------
  // mutate DNA with small random chance for each vector
  this.mutate = function() {
    for (let i = 0; i < this.genes.length; i++) {
			let r = random(1);
      if (r < 0.05) {
      	this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(vecMag);
      }
    }

  }
}
