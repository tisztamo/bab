import {b2, physicsInitialized} from "./b2.js"

export class Simulation {
  constructor() {
    this.gravity = new b2.b2Vec2(0, 10.0)
    this.physicsWorld = new b2.b2World(this.gravity)
    this.renderer = null
    this.elements = []
    this.dt = 1
    this.interval = null;
    this.width = 14.0
    this.height = 10.0
  }

  setRenderer(renderer) {
    if (this.renderer === renderer) return
    this.renderer = renderer
    this.elements.forEach(e => this.renderer.addElement(e))
  }

  add(gameElement) {
    this.elements.push(gameElement)
    if (this.renderer) {
      this.renderer.addElement(gameElement)
    }
  }

  simulate() {
    const now = Date.now()
    const dt = now - this.lastRunTS
    if (dt > 0) {
      this.physicsWorld.Step(dt * 0.001, 8, 3)
    }
    this.lastRunTS = now
  }

  checkLostElements() {
    //TODO
  }

  start(stepsPerSec = 60) {
    this.dt = 1000 / stepsPerSec
    this.lastRunTS = Date.now()
    this.interval = setInterval(this.simulate.bind(this), this.dt)
  }

  stop() {
    clearInterval(this.interval)
  }
}

