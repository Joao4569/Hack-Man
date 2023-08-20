// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";


///////////////// DETERMINING THE SIZE OF THE GAME ///////////////////////////////////////////////


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


////////////////////////////// CREATE GAME SCENE ///////////////////////////////////////


// Wrap level in a scene
scene("game", () => {


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
        '= *                  *               *       =          * =',
        '= ***********% ***************************** = ********** =',
        '=    *     *   *   *     *   *   *     *   * = *     *    =',
        '==== * === * = * = * === * = * = * === * = * = * === * ====',
        '     * = = * = * = * = = * = * = * = = * = * = * = = *     ',
        '****** = = * = * = * = = * = * = * = = ! = * = * = = ******',
        '     * = = * = * = * = = * =   = * = =   = * = * = = *     ',
        '==== * === * = * = * === * ===== * === * = * = * === * ====',
        '=    *     * = *   *     *       *     *   *   *     *    =',
        '= ********** = ********& ******************************** =',
        '= *          =       *               *                  * =',
        '= * ================ * ============= * ================ * =',
        '= *                = *         =     * =                * =',
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
        pos(10, 10),
        scale(.5),
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
        pos(gameDisplayWidth - 10, 10),

        scale(.5),
        
        // set anchor
        anchor("topright"),
    ])


//////////////////////// Lives ////////////////////////////////////////
add([
    text("LIVES:", { size: 20}),
    pos(gameDisplayWidth - 300, 10),
  ]);

const livesText = add([
    text("1", { size: 20}),
    pos(gameDisplayWidth - 230, 10),
  ]);

  function updateLives(life) {
    player.lives += life;
    livesText.text = player.lives.toString();
  }
////////////////////////////// Player ///////////////////////////////////////////////////


// Add Player object to game
const player = add([
    sprite("player"),
    pos(100, 100),
    area(),
    body(),
    {
        lives: 1,
    },
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
        updateLives(-1);
        score.text = "Score: " + score.value
        if (player.lives == 0) {
            go("over");
          }
        addKaboom(enemy.pos)
    })


    //////////////////////////////// Enemy class definition /////////////////////////////////////////////////


    // Construct a new enemy
    // To have it move, call the setMovementPattern() method right after the object instance is created
    class Enemy {
        constructor(position, direction) {
            this.enemy = add([
                sprite("enemy"),
                pos(position),
                area(),
                body(),
                anchor("center"),
                state(direction, ["up", "right", "down", "left"]),
                { defaultDirection: direction },
                "enemy",
            ])
        }

        // Code to make enemy turn on collision with walls. Default movement is up.
        setMovementPattern() {
            let enemySpeed = 30

            // Set default direction
            // let enemyDir = this.enemy.defaultDirection
            let enemyDir

            // Tells object to move every frame - toward enemyDir at enemySpeed
            onUpdate(() => {
                this.enemy.move(enemyDir.scale(enemySpeed))
            })

            this.enemy.onStateEnter("up", () => {
                enemyDir = UP
            })

            this.enemy.onStateEnter("right", () => {
                enemyDir = RIGHT
            })

            this.enemy.onStateEnter("down", () => {
                enemyDir = DOWN
            })

            this.enemy.onStateEnter("left", () => {
                enemyDir = LEFT
            })

            // On collision with a wall, enemy will bounce away by 1 pixel (to avoid wall clipping),
            // then randomly turn left or right and continue moving
            this.enemy.onCollide("wall", () => {
                let randDir = Math.floor(Math.random() * 2) // generate 0 or 1

                // Based on current movement state, bounce away in the correct direction,
                // then pick left or right based on random binary generated above
                if (this.enemy.state === "up") {
                    this.enemy.pos.y += 1
                    if (randDir === 0) {
                        this.enemy.enterState("left")
                    } else if (randDir === 1) {
                        this.enemy.enterState("right")
                    }
                } else if (this.enemy.state === "down") {
                    this.enemy.pos.y -= 1
                    if (randDir === 0) {
                        this.enemy.enterState("left")
                    } else if (randDir === 1) {
                        this.enemy.enterState("right")
                    }
                } else if (this.enemy.state === "right") {
                    this.enemy.pos.x -= 1
                    if (randDir === 0) {
                        this.enemy.enterState("up")
                    } else if (randDir === 1) {
                        this.enemy.enterState("down")
                    }
                } else if (this.enemy.state === "left") {
                    this.enemy.pos.x += 1
                    if (randDir === 0) {
                        this.enemy.enterState("up")
                    } else if (randDir === 1) {
                        this.enemy.enterState("down")
                    }
                }
            })
        }
    }


    //////////////////////////////// Create enemies /////////////////////////////////////////////////


    const newEnemy1 = new Enemy(vec2(172, 105), "up")
    const newEnemy2 = new Enemy(vec2(415, 105), "right")
    const newEnemy3 = new Enemy(vec2(415, 265), "down")
    const newEnemy4 = new Enemy(vec2(172, 265), "left")
    newEnemy1.setMovementPattern()
    newEnemy2.setMovementPattern()
    newEnemy3.setMovementPattern()
    newEnemy4.setMovementPattern()


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


    //////////////////////////////// Music ///////////////////////////////////////////////

    ////////////  Music has been commented out/disabled for development purposes!!!  ////////////////////

    // play a looping soundtrack
    // loadSound("cruising", "assets/music/cruising.mp3")

    // const music = play("cruising", {
    //     volume: 0.8,
    //     loop: true
    // })


    //////////////////////////////// Exit Game Key Press ///////////////////////////////////////////////


    // Delete this section!! For testing purposes only

    onKeyPress("q", () => {
        go("over")
    })

})


////////////////////////////// CREATE GAME OVER SCENE ///////////////////////////////////////


scene("over", () => {
    add([
        text("Game over"),
        pos(10, 10),
    ])
})


//////////////////////////////// Scene Control ///////////////////////////////////////////////


go("game")
