// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
// and add black background
kaboom({
    width: 1920,
    height: 1080,
    font: "sans-serif",
    background: [ 0, 0, 0, ],
    scale: 1
})

// load assets
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

// Add Score object to game
const score = add([
    text("Score: 0"),
    { value: 0 },

    // Make blue
    color(0, 0, 255),

    // Position at center of screen (position relative to the center of the score object)
    pos(width() / 2, 50),
    anchor("center"),
])

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

//walls and stationary objects go here
addLevel([
    "                                                           ",
    '                                                           ',
    '                                                           ',
    '                                                           ',
    '===========================================================',
    '=                             =                           =',
    '=                             =                           =',
    '=                             =                           =',
    '=                             =                           =',
    '=                                                         =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '=                                 =                       =',
    '===========================================================',
  ],{
      // define the size of tile bck
      tileWidth: 32,
      tileHeight:  32,
      // define what each symbol means, by a function returning a component list (what will be passed to add())
      tiles: {
          "=": () => [//each symbol represents an object
              sprite("maze-wall"),
              scale(3),
              area(),//for collision detection
              pos(),
              body(),
              "wall",// tag for collision detection
          ]
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

//NEW CODE FOR ENEMY MOVEMENT
onLoad(() => {
	const ghost = add([
		sprite("enemy"),
		pos(500, 100),//position on screen
		scale(3),//size of sprite
		area(),
		move(LEFT,50)])
})

// Add 5 point dots to game
for (let i = 0; i < 5; i++){
    add([
        sprite("pointDot"),
        pos(250 + i * 50, 250),
        scale(3),
    
        // area() component gives the object a collider, which enables collision checking
        area(),
    
        // add tag so behavior can be assigned (on collision)
        "pointDot",
    ])
}

// When player collides with a point dot, it disappears and 10 points are added to the score
player.onCollide("pointDot", (pointDot) => {
    destroy(pointDot)

    // Increase score and update display
    score.value += 10
    score.text = "Score: " + score.value
})
