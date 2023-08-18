import kaboom from "kaboom"



kaboom({
		width: 2700,
		height: 1500,
		// canvas: document.querySelector("#mycanvas"),   dont know if we need this
		font: "sans-serif",
		background: [ 0, 0, 0, ],
		scale: 1
	})



// See #SpriteAtlasData type for format spec
loadSpriteAtlas("sprites/spritesheet.png", {
  "enemy": {
      x: 18,
      y: 84,
      width: 15,
      height: 14,
    
  },
	"maze-wall": {
      x: 36,//position on the spritsheet
      y: 72,
      width: 10,//with of the sprite
      height: 10
	},
  "pacman": {
      x: 537,
      y: 641,
      width: 33,
      height: 101,
      sliceY: 3,//how many slices 1 for each sprite in the row creates animation 
      anims: {
        idle: { from: 1, to: 2,loop: true, speed:5},
        run: { from: 0, to: 2 , loop: true, speed:5},
        hit: 8,
    },
  }
})

const pacman = add([
sprite("pacman",{
    // start with animation "idle"
    anims: "idle",
}),
	pos(120, 80),//posotion on screen
	scale(3),//size of sprite
  area(),// for collision detection
  body(),//both objects need this to be able to collide
  "pacman",//tag for collision
])
const enemy = add([
	sprite("enemy"),
	pos(120, 80),//posotion on screen
	scale(3),//size of sprite
  area(),// for collision detection
  body(),//both objects need this to be able to collide
  "enemy",//tag for collision
])
//pacman.play("idle") // animates pacman but causing screen to go black
pacman.play("run")//plays the animation

//event listeners
//collision detection
pacman.onCollide("wall", () => {
  addKaboom(500, 500)
   }
)

let movespeed = 150;
onKeyDown("right",(evt) => {
  pacman.move(movespeed,0)
})


onKeyDown("left",(evt) => {
	pacman.move(-movespeed,0)
})

onKeyDown("up",(evt) => {
  pacman.move(0,-movespeed)
})
onKeyDown("down",(evt) => {
	pacman.move(0,movespeed)
})



//walls and stationary objects go here
addLevel([
  "                                                                      ",
  '======================================================================',
 ' =                                 =                                  =',
  '=                                 =                                  =',
 ' =                                 =                                  =',
  '===================              =                                  =',
  '=                                 =                                  =',
  '=                                 ===============                    =',
  '=                                                        %           =',
  '=                                 ===============                    =',
  '=                                 =                                  =',
  '=                                 =                                  =',
  '=                                 =                                  =',
 ' =                                 =                                  =',
  '=                                 =                                  =',
  '=                                 =                                  =', 
  '=                                 =                                  =',
  '=                                 =                                  =',
 ' =                                 =                                  =',
  '=                                 =                                  =',
  '=                                 =                                  =', 
  '=                                 =                                  =',
  '=                                 =                                  =',
 ' =                                 =                                  =',
  '=                                 =                                  =',
  '=                                 =                                  =',
  '=====================================================================,',

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
