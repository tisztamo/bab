import {b2} from "./b2.js"

export class GameElement {
  constructor(simulation) {
    this.simulation = simulation
    this.physicsWorld = simulation.physicsWorld
    this.graphics = null
  }

  updateGraphics() {
    if (!this.graphics) return
    const bpos = this.body.GetPosition();
    const viewPos = this.simulation.renderer.modelToView(
      bpos.get_x(), bpos.get_y(), this.graphics)
    this.graphics.rotation = this.body.GetAngle()
  }

  createGraphics() {
    return this.graphics
  }
}
