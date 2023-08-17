import kaboom from "kaboom"

kaboom()

// See #SpriteAtlasData type for format spec
loadSpriteAtlas("sprites/spritesheet.png", {
    "enemy": {
        x: 18,
        y: 84,
        width: 15,
        height: 14,
        anims: {
            idle: { from: 0, to: 3 },
            run: { from: 4, to: 7 },
            hit: 8,
        },
    },
	"maze-wall": {
		x: 36,
		y: 72,
		width: 10,
		height: 10
	}
})

add([
	pos(120, 80),
	sprite("enemy"),
	scale(3)
])

add([
	pos(10, 10),
	sprite("maze-wall"),
	scale(3)
])

for(let i = 0; i < 20; i++){
	
	add([
		pos(i * 30, 10),
		sprite("maze-wall"),
		scale(3)
	])
	if(i == 19){
		for(let j = 1;j < 20; j++){
			add([
				pos(i * 30, j * 30),
				sprite("maze-wall"),
				scale(3)
			])
		}
	}
}

onClick(() => addKaboom(mousePos()))

// addLevel([
// 	'    ',
// 	'@    ',
// 	'xxxxx',

// ],{
// 	width: 40,
// 	height: 40,
// 	'x': [sprite("spritesheet"), solid]
// })