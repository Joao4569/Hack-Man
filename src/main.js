// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";


///////////////// DETERMING THE SIZE OF THE GAME ///////////////////////////////////////////////


// Note: this code is placed before the initialization of the game
// because the calculated numbers are used in initialization

// Set the sizes of the game
// (This is the approximate size currently,
// but if size needs to be changed just edit these numbers)
const gameWidth = 590
const gameHeight = 370
const gameAspRatio = gameWidth / gameHeight

// Get the aspect ratio of the current browser window
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let screenAspRatio = screenWidth / screenHeight

// Create variables to store calculated sizes and scale
let canvasWidth;
let canvasHeight;
let gameScale;

if (screenAspRatio > gameAspRatio) { // limiting screen axis is height (screen is wider than game)
    canvasHeight = screenHeight * .8
    canvasWidth = (gameWidth / gameHeight) * canvasHeight
    
    gameScale = canvasHeight / gameHeight // scale the game by how much bigger the canvas is than the base size
    
} else if (screenAspRatio <= gameAspRatio) { // limiting screen axis is width (screen is taller than game)
    canvasWidth = screenWidth * .8
    canvasHeight = (gameHeight / gameWidth) * canvasWidth
    
    gameScale = canvasWidth / gameWidth

}

// Game canvas display width and height adjusted for overall game scaling
let gameDisplayWidth = canvasWidth / gameScale
let gameDisplayHeight = canvasHeight / gameScale


///////////////////////////// Kaboom /////////////////////////////////////


// initialise kaboom and it's context
kaboom({
    // make the width and height of the game the same as the canvas,
    // and offset the scaling of these numbers that happens by setting scale below
    width: gameDisplayWidth,
    height: gameDisplayHeight,
    
    font: "sans-serif",
    
    // black background
    background: [ 0, 0, 0, ],
    
    // scale the game based on the calculations above
    scale: gameScale,
    
    // initialize the game in(as?) the canvas in game.html
    canvas: document.querySelector("#mycanvas"),
    
})


////////////////////////////// Maze ///////////////////////////////////////


// walls and stationary objects
addLevel([
    "                                                           ",
    '                                                           ',
    '                                                           ',
    '                                                           ',
    '===========================================================',
    '=          =                   =                          =',
    '= ***! *** = ***************** = ************************ =',
    '= *      * = *   *       *   * = *       *              * =',
    '= * ==== * = * = * ===== * = * = * ===== * ============ * =',
    '= *      *   *   * =     * = *   *     = *              * =',
    '= **************** = ***** = ********% = ****$ ********** =',
    '= *                = *     =           =                * =',
    '= * ================ * ============= * ================ * =',
    '= *          =       *               *       =          * =',
    '= ********** = ***************************** = ********** =',
    '=    *     *   *   *     *   *   *     *   *   *     *    =',
    '==== * === **% * = * === * = * = * === * = ***** === * ====',
    '     * = = *   * = * = = * = * = * = = * = *   * = = *     ',
    '****** = = * = * = * = = * = * = * = = ! = * = * = = ******',
    '     * = = *   * = * = = * =   = * = =   = *   * = = *     ',
    '==== * === ***** = * === * ===== * === * = ***** === * ====',
    '=    *     *   *   *     *       *     *   *   *     *    =',
    '= ********** = ********& ******************* = ********** =',
    '= *          =       *               *       =            =',
    '= * ================ * ============= * ================   =',
    '= *                = *         =     * =                  =',
    '= **************** = ********* = ***** = **************** =',
    '= *              * =     *   * = *     = *   *   *      * =',
    '= * ============ * ===== * = * = * ===== * = * = * ==== * =',
    '= *              *       * = !   *       *   * = *      * =',
    '= $ ********************** =   *************** = & ****** =',
    '=                          =                   =          =',
    '===========================================================',
],{
    // this will define the size of each tile of the wall
    tileWidth: 10,
    tileHeight: 10,
    
    // this will define each symbol used on the maze map, by a function returning a component list (what will be passed to add())
    tiles: {
        
        // wall
    "=": () => [ //each symbol represents an object
        sprite("maze-wall"),
        area(), //for collision detection
        pos(),
        body({ isStatic: true }),
        "wall", // tag for collision detection
    ],
    // dots
    "*": () => [
        sprite("pointDot"),
        pos(),
        area(),       
        "pointDot",  // add tag so behavior can be assigned (on collision)},
    ],
    //fruits
    "!": () => [
        sprite("apple"),
        pos(),
        area(),       
        "fruit",  // add tag so behavior can be assigned (on collision)},
    ],
    "$": () => [
        sprite("strawberry"),
        pos(),
        area(),       
        "fruit",  // add tag so behavior can be assigned (on collision)},
    ],
    "&": () => [
        sprite("cherry"),
        pos(),
        area(),       
        "fruit",  // add tag so behavior can be assigned (on collision)},
    ],
    "%": () => [
        sprite("yellowFruit"),
        pos(),
        area(),       
        "fruit",  // add tag so behavior can be assigned (on collision)},
    ]
}
})


////////////////////////////////////// Sprites //////////////////////////////////


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
    },
    "apple": {
        x: 52,
        y: 303,
        width: 15,
        height: 15,
      },
    "strawberry": {
        x: 618,
        y: 490,
        width: 15,
        height: 15,
      },
    "cherry": {
        x: 601,
        y: 490,
        width: 15,
        height: 15,
      },    
    "yellowFruit": {
        x: 436,
        y: 676,
        width: 15,
        height: 15,
      },    
})

// load  the player sprite sprite 
loadSpriteAtlas("src/sprites/player-sprite.png", {
    "player": {
        x: 0,//horizontal sprite position on the spritesheet 
        y: 0,//vertical position on spritesheet
        width: 702,//width of the spritesheet all 3 images in the animation
        height: 234,//height of the spritesheet
        sliceX : 3,//how many sprites are on the sprite sheet for this invidual animation
        anims: {
            idle: { from: 1, to: 2,loop: true, speed:3},
            run: { from: 2, to: 0 , loop: true, speed:4},//run animation
        },
        
    }
})


//////////////////////////// User Instructions ///////////////////////////////


add([
    // text() component is similar to sprite() but renders text
    text("Press arrow keys to move"),
    pos(1, 1),
])


//////////////////////// Scoreboard ////////////////////////////////////////


// Add Score object to the game
const score = add([
    
    // initialise the score
    text("Score: 0"),
    { value: 0 },
    
    // scoreboard color
    color(0, 0, 255),
    
    // Position at center of screen (position relative to the center of the score object)
    pos(300, 50),
    
    // set anchor
    anchor("center"),
])


////////////////////////////// Player ///////////////////////////////////////////////////


// Add Player object to game
const player = add([
    sprite("player"),
    pos(100, 100),
    area(),
    body(),
    scale(.1),
    rotate(0), // rotate() component gives it rotation
    anchor("center"),
    "player",
])

//////////////////////// Player Movement - User input /////////////////////////////////////////////////

//starts the pacman animation
player.play("run")

// Define player movement speed in pixels per second
const SPEED = 70

// Define player movement with inputs from user
// left
onKeyDown("left", () => {
    // .move() is provided by pos() component, move by pixels per second
    player.move(-SPEED, 0)
    player.angle = 180
})

// right
onKeyDown("right", () => {
    player.move(SPEED, 0)
    player.angle = 0//changes the rotation of the object rotate(0) and anchor("center") have to be attached to object 
})


// up
onKeyDown("up", () => {
    player.move(0, -SPEED)
    player.angle = -90
})

// down
onKeyDown("down", () => {
    player.move(0, SPEED)
    player.angle = 90
})


//////////////////////// Player Movement - Secret tunnel /////////////////////////////////////////////////


onUpdate("player", (player) => {
    if (player.pos.x < 0) {
        let yCoord = player.pos.y
        player.moveTo(gameDisplayWidth - 10, yCoord)
    }
        
    if (player.pos.x > gameDisplayWidth) {
        let yCoord = player.pos.y
        player.moveTo(10, yCoord)
    }
})


//////////////////////// Player Action - Eat dots /////////////////////////////////////////////////


// When player collides with a point dot, it disappears and 10 points are added to the score
player.onCollide("pointDot", (pointDot) => {
    destroy(pointDot)
    
    // Increase score and update display
    score.value += 10
    score.text = "Score: " + score.value
})

//////////////////////// Player Action - Eat fruits /////////////////////////////////////////////////


// When player collides with a fruit, it disappears and 100 points are added to the score
player.onCollide("fruit", (fruit) => {
    destroy(fruit)
    
    // Increase score and update display
    score.value += 100
    score.text = "Score: " + score.value
})


//////////////////////// Player Action - Kill enemy /////////////////////////////////////////////////


//when player collides with enemy the enemy disappears and 10 points are added to the score and
//the kaboom explosion animation plays in the enemy position
player.onCollide("enemy", (enemy)=>{
    destroy(enemy)
    score.value += 10
    score.text = "Score: " + score.value
    addKaboom(enemy.pos)
})


//////////////////////////////// Ghost/Enemy /////////////////////////////////////////////////


// Create an empty array to store all enemy objects
const allEnemies = []

// Add 3 ghosts to game
for (let i = 0; i < 3; i++) {
    let enemy = add([
        sprite("enemy"),
        pos(200, 100), // position on screen
        area(), // necessary to allow collisions
        body(), // necessary so it doesn't pass through other objects
        "enemy"
    ])
    
    allEnemies.push(enemy) // add new enemy object to allEnemies
}


//////////////////////////////////// Enemy1 /////////////////////////////////////////////////


// ENEMY 1 - What is this???? CI enemy? - Johnny asking, DM me
// const enemy1 = add([
// 	sprite("enemy"),
// 	anchor("center"),
// 	area(),
// 	body(),
//   pos(200, 100), //position on screen
// This enemy cycle between 3 states, and start from "idle" state
// 	state("move"),
// ])

// enemy1.onStateUpdate("move", () => {
// 	if (!player.exists()) return
// 	const dir = player.pos.sub(enemy1.pos).unit()
// 	enemy1.move(dir.scale(ENEMY_SPEED))
// })

// Enemy1 follows player
// const ENEMY_SPEED = 120


///////////////////////////// Ghost/Enemy Action - Programmed Behaviour /////////////////////////////////////////////////


/**
* Generate a random direction (left, right, up or down)
* @returns a random direction
*/

function randomDirection() {
    let enemySpeed = 100;
    let directionsList = [
        [enemySpeed, 0],
        [-enemySpeed, 0],
        [0, enemySpeed],
        [0, -enemySpeed]
    ]
    let randomIndex = Math.floor(Math.random() * 4);
    let direction = directionsList[randomIndex];
    
    return direction;
}

// On each frame, enemy moves in the x and y directions stored in newDir
// When enemy hits a wall, direction changes, causing it to turn left or right
allEnemies.forEach((enemy) => {
    let newDir = randomDirection()
    onUpdate(() => {
        enemy.move(newDir[0], newDir[1])
    })
    // --- COMMENT BACK IN FROM HERE FOR CHANGE DIRECTION CODE ---
    // enemy.onCollide("wall", () => {
    //     debug.log("enemy hit wall") // CAN BE REMOVED - checking when they hit walls
    //     newDir = changeDirection(newDir)
    // })
    // --- COMMENT BACK IN UNTIL HERE FOR CHANGE DIRECTION CODE
})

/**
* Based on the current movement of the enemy, returns a new direction that will
* cause enemy to turn (randomly) right or left when it hits a wall
* @param {*} currentDirection 
* @returns direction as an array
*/
// --- COMMENT BACK IN FROM HERE FOR CHANGE DIRECTION CODE ---
// function changeDirection(currentDirection) {
//     // set speed
//     let enemySpeed = 100

//     // randomly generate a positive or negative speed
//     let posOrNeg = Math.floor(Math.random() * 2)
//     let randSpeed
//     if (posOrNeg == 0) {
//         randSpeed = enemySpeed
//     } else {
//         randSpeed = -enemySpeed
//     }

//     // change the direction - set whatever axis was non-zero to zero and set the other
//     // axis to the random direction from above
//     let xMov = currentDirection[0]
//     let yMov = currentDirection[1]
//     if (xMov != 0) {
//         xMov = 0
//         yMov = randSpeed
//     } else if (yMov != 0) {
//         xMov = randSpeed
//         yMov = 0
//     }

//     // store the new x and y speeds in an array
//     let direction = [xMov, yMov]

//     return direction
// }
// --- COMMENT BACK IN UP UNTIL HERE FOR CHANGE DIRECTION CODE ---


//////////////////////////////// Music ///////////////////////////////////////////////

////////////  Music has been commented out/disabled for development purposes!!!  ////////////////////

// play a looping soundtrack
// loadSound("cruising", "assets/music/cruising.mp3")

// const music = play("cruising", {
//     volume: 0.8,
//     loop: true
// })






