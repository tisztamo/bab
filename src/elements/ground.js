import {GameElement} from "../game_element.js"
import {b2} from "../b2.js"

export class Ground extends GameElement {
  constructor(simulation) {
    super(simulation)
    this.createBody()
  }

  createBody() {
    const groundBD = new b2.b2BodyDef()
    const shape0 = new b2.b2EdgeShape()
    shape0.Set(new b2.b2Vec2(0, this.simulation.height - 0.7),
      new b2.b2Vec2(this.simulation.width * 0.7, this.simulation.height - 0.2))
    this.body = this.physicsWorld.CreateBody(groundBD)
    this.body.CreateFixture(shape0, 0.0)
  }
}
