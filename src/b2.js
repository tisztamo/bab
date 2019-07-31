export const b2 = {}

export const physicsInitialized = Box2D().then(function(box2) {
  Object.assign(b2, box2)
  return b2
})
