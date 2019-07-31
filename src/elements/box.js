import {GameElement} from "../game_element.js"
import {b2} from "../b2.js"

export class Box extends GameElement {
  constructor(simulation, pos) {
    super(simulation)
    this.size = 1.0
    this.createBody(pos)
  }

  createBody(rawPos) {
    const pos = new b2.b2Vec2(rawPos.x, rawPos.y);
    const bd = new b2.b2BodyDef()
    bd.set_type(b2.b2_dynamicBody)
    bd.set_position(pos)
    const boxShape = new b2.b2PolygonShape();
    boxShape.SetAsBox(this.size / 2, this.size /2);
    this.body = this.physicsWorld.CreateBody(bd);
    this.body.CreateFixture(boxShape, 5.0);
  }

  createGraphics() {
    const box = new PIXI.Graphics();
    const viewSize = this.simulation.renderer.modelToView(this.size, this.size)
    box.pivot.x = viewSize.x / 2
    box.pivot.y = viewSize.y / 2
    box.beginFill(0xffdf00, 1.0)
    box.drawRect(0, 0, viewSize.x, viewSize.y)
    this.graphics = box
    return box
  }

}
