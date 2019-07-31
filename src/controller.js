import {Box} from "./elements/box.js"

export class Controller {
  constructor(simulation, renderer) {
    this.simulation = simulation
    this.renderer = renderer
  }

  init() {
    this.renderer.domElement.addEventListener("pointerdown", this.handlePointerDown.bind(this))
  }

  handlePointerDown(e) {
    this.simulation.add(new Box(this.simulation,
      this.renderer.viewToModel(e.clientX, e.clientY)))
  }
}
