function Population() {
    this.rockets = [];
    this.popSize = populationSize;
    this.matingPool = [];

    // populate rockets
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i] = new Rocket();
    }

    // ---------------------------------------
    // update the physics of a rockets and render it
    this.run = function() {
      for (let i = 0; i < this.popSize; i++) {
        this.rockets[i].update();
        this.rockets[i].show();
      }

    }

    // ---------------------------------------
    // fitness values for each rocket, normalized to [0,1]
    this.fitness = function() {
      // max fit for normalization and get fitness
      let maxFit = 0;
      for (let i = 0; i < this.popSize; i++) {
        this.rockets[i].fitness();
        if (this.rockets[i].fitness > maxFit) {
          maxFit = this.rockets[i].fitness;
        }
      }

      for (let i = 0; i < this.popSize; i++) {
        this.rockets[i].fitness /= maxFit;
      }

      // clear mating pool and refill
      this.matingPool = [];
      // rockets fitness 0-100
      for (let i = 0; i < this.popSize; i++) {
        let matingProb = this.rockets[i].fitness * 100;
        for (let j = 0; j < matingProb; j++) {
          this.matingPool.push(this.rockets[i]);
        }
      }
    }

    // -------------------------------------
    // perform crossover (splice parents DNA in 2 and mix)
    // ... and randomly mutate each DNA 
    this.selection = function() {
      let newRockets = [];

      for (let i = 0; i < this.rockets.length; i++) {
        // Picks random dna
        let parentA = random(this.matingPool).dna;
        let parentB = random(this.matingPool).dna;

        // Creates child by using crossover function
        let child = parentA.crossover(parentB);

        // mutate childs dna
        child.mutate();

        // Creates new rocket with child dna
        newRockets[i] = new Rocket(child);
      }
      // This instance of rockets are the new rockets
      this.rockets = newRockets;
    }
}
