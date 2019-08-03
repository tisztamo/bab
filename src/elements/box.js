import {GameElement} from "../game_element.js"
import {b2} from "../b2.js"

// export const colors = [0x2E86AB, 0xAF9164, 0x690500, 0x3C1518, 0xBB6B00]
// export const colors = [0x01161E, 0x124559, 0x598392, 0xAEC3B0, 0xEFF6E0]
//export const colors = [0x845EC2, 0x4B4453, 0xB0A8B9, 0x00896F, 0x00C0A3]

// extra pasztell
// export const colors = [0x1D985E, 0x66CCAF, 0xF2DC9A, 0xE68D30, 0xBA5943]

// Kiegyensúlyozott, felvidítós pasztell
//export const colors = [0x378E53, 0xA3D449, 0xFBE864, 0xE88246, 0xC83B2C]

// Kiegyensúlyozott, felvidítós élénk
export const colors = [0x12B0F8, 0x14A6A6, 0xEEEC58, 0xF1AE4C, 0xF13551]

export class Box extends GameElement {
  constructor(simulation, pos) {
    super(simulation)
    this.size = 1.0
    this.color = Math.floor(Math.random() * 5)
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
    box.beginFill(colors[this.color], 1.0)
    box.drawRect(0, 0, viewSize.x, viewSize.y)
    this.graphics = box
    return box
  }

}
