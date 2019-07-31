import {physicsInitialized} from "./b2.js"
import {Simulation} from "./simulation.js"
import {Ground} from "./elements/ground.js"
import {Renderer} from "./renderer.js"
import {Controller} from "./controller.js"

physicsInitialized.then(() => {
  const sim = new Simulation()
  sim.add(new Ground(sim))
  const renderer = new Renderer(sim)
  const controller = new Controller(sim, renderer)

  sim.start()
  renderer.start()
  controller.init()
})
