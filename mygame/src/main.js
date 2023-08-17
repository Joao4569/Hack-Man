import kaboom from "kaboom"

const k = kaboom()
// See #SpriteAtlasData type for format spec
k.loadSpriteAtlas("sprites/spritesheet.png", {
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

k.add([
	k.pos(120, 80),
	k.sprite("enemy"),
	k.scale(3)
])

k.add([
	k.pos(10, 10),
	k.sprite("maze-wall"),
	k.scale(3)
])

for(let i = 0; i < 20; i++){
	
	k.add([
		k.pos(i * 30, 10),
		k.sprite("maze-wall"),
		k.scale(3)
	])
	if(i == 19){
		for(let j = 1;j < 20; j++){
			k.add([
				k.pos(i * 30, j * 30),
				k.sprite("maze-wall"),
				k.scale(3)
			])
		}
	}
}

k.onClick(() => k.addKaboom(k.mousePos()))

// k.addLevel([
// 	'    ',
// 	'@    ',
// 	'xxxxx',

// ],{
// 	width: 40,
// 	height: 40,
// 	'x': [sprite("spritesheet"), solid]
// })