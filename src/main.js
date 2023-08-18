// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
kaboom();

// load assets
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

// add a game object to screen
add([
    // list of components
    sprite("bean"),
    pos(80, 40),
    area(),
]);

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
		height: 10
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
