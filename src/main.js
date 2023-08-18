// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
kaboom();

// load assets
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

// Add Player object to game
const player = add([
	sprite("bean"),
	pos(80, 40),
  area(),
  scale(1),
])

// Player movement
// Define player movement speed (pixels per second)
const SPEED = 320

onKeyDown("left", () => {
	// .move() is provided by pos() component, move by pixels per second
	player.move(-SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})

onKeyDown("up", () => {
	player.move(0, -SPEED)
})

onKeyDown("down", () => {
	player.move(0, SPEED)
})

add([
	// text() component is similar to sprite() but renders text
	text("Press arrow keys to move", { width: width() / 2 }),
	pos(12, 12),
])


// Below - examples of how to add sprite objects to game from spritesheet
// See #SpriteAtlasData type for format spec
loadSpriteAtlas("src/sprites/spritesheet.png", {
    "enemy": {
        x: 18,
        y: 84,
        width: 15,
        height: 15,
    },
	"maze-wall": {
		x: 36,
		y: 72,
		width: 10,
		height: 10,
	},
    "pointDot": {
        x: 337,
        y: 197,
        width: 6,
        height: 7,
    }
})

// CAN BE DELETED
add([
	pos(300, 300),
	sprite("enemy"),
	scale(3)
])

// CAN BE DELETED
add([
	pos(200, 100),
	sprite("maze-wall"),
	scale(3)
])

// add point dot to game
add([
    sprite("pointDot"),
    pos(250, 250),
    scale(2),

    // area() component gives the object a collider, which enables collision checking
    area(),

    // add tag so behavior can be assigned (on collision)
    "pointDot",
])

// point dot disappears when player collides with it
player.onCollide("pointDot", (pointDot) => {
    destroy(pointDot)
})
