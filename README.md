# Smart Rockets
This project is an implementation of smart rockets that uses a genetic algorithm to learn and evolve the shortest path to a target, navigating past an obsticle. The code and graphics are written using the [P5.js](https://p5js.org/) coding language, and the full program can be seen [here](https://ltmullineux.github.io/smart-rockets/).

- To begin, a population of rockets is initialized.
- Each rocket has an array of random vectors that will determine its path during the episode.
- At the end of each episode the fitness of each rocket is calculated as function of it's distance to the target and how long it takes to get there.
- Mating via crossover and mutation is done to derive the population for the next episode.
- As episode progress the rockets converge on the one of the optimal paths to the target.

The implementation is derived from Dan Shiffman's work in his book [The Nature of Code](https://natureofcode.com/) and from the sister [YouTube video](https://www.youtube.com/watch?v=bGz7mv2vD6g&t=1980s).

![Alt Text](smartrockets.gif)
