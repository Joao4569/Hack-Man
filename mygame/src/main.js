import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("enemy", "sprites/spritesheet.png",{
	sliceX: 1,
    sliceY: 1,
    anims: {
        run: {
            from: 0,
            to: 3,
        },
        jump: {
            from: 3,
            to: 3,
        },
    },
})

k.add([
	k.pos(120, 80),
	k.sprite("enemy"),
])

k.onClick(() => k.addKaboom(k.mousePos()))

// k.addLevel([
// 	'    ',
// 	'@',
// 	'xxxxx',

// ],{
// 	width: 40,
// 	height: 40,
// 	'@': [sprite("spritesheet"), solid]
// })