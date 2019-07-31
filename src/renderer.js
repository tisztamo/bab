export class Renderer {
  constructor(simulation) {
    this.simulation = simulation
    this.lastTS = 0
    this.app = null
    this.domElement = null
  }

  start() {
    this.app = new PIXI.Application({ antialias: true })
    document.body.appendChild(this.app.view)
    this.domElement = this.app.view
    this.app.stage.interactive = true
    this.app.ticker.add(this.tick.bind(this))
    this.simulation.setRenderer(this)

    this.resizeListener = this.resizeListener.bind(this)
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()
  }

  resizeListener() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.modelUpperY = 0.0
    this.modelLeftX = 0.0
    this.scale = Math.min(this.width / this.simulation.width,
      this.height / this.simulation.height)
    this.app.renderer.resize(this.width, this.height)
  }

  stop() {
    window.removeEventListener("resize", this.resizeListener)
  }

  addElement(element) {
    const graphics = element.createGraphics()
    if (graphics) {
      this.app.stage.addChild(graphics)
    }
  }

  tick() {
    const current = Date.now()
    const dt = (current - this.lastTS) / 1000
    this.simulation.elements.forEach(e => e.updateGraphics())
    this.lastTS = current
  }

  modelToView(x, y, optionalOut) {
    if (optionalOut) {
      optionalOut.x = (x - this.modelLeftX) * this.scale
      optionalOut.y = (y - this.modelUpperY) * this.scale
      return
    }
    return {
      x: (x - this.modelLeftX) * this.scale,
      y: (y - this.modelUpperY) * this.scale
    }
  }

  viewToModel(x, y) {
    return {
      x: x / this.scale + this.modelLeftX,
      y: y / this.scale + this.modelUpperY
    }
  }
}
