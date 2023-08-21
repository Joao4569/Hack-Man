// import kaboom lib
// do not change this
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";


///////////////// DETERMINING THE SIZE OF THE GAME ///////////////////////////////////////////////


// Note: this code is placed before the initialization of the game
// because the calculated numbers are used in initialization

// These are the scaling calculations, left in for now in case we want to reincorporate any parts of them

// Set the sizes of the game
// (This is the approximate size currently,
// but if size needs to be changed just edit these numbers)
const gameWidth = 800
const gameHeight = 650
let scoreText;


///////////////////////////// Kaboom /////////////////////////////////////


// initialise kaboom and it's context
kaboom({
    // make the width and height of the game the same as the canvas,
    // and offset the scaling of these numbers that happens by setting scale below
    width: gameWidth,
    height: gameHeight,

    // black background
    background: [0, 0, 0, ],

    // scale the game based on the calculations above
    // scale: gameScale,

    // initialize the game in(as?) the canvas in game.html
    canvas: document.querySelector("#mycanvas"),

})


////////////////////////////// CREATE GAME SCENE ///////////////////////////////////////


// Wrap level in a scene
scene("game", () => {


    ////////////////////////////// Maze ///////////////////////////////////////


    // walls and stationary objects
    addLevel([
        '                                ',
        '                                ',
        '                                ',
        '================================',
        '=&************** =************ =',
        '=*  *       *  * =*       *  * =',
        '=* =* ===== * =* =*$ =====* =* =',
        '=**** = ***** =********* =***% =',
        '=*    = *     =        * =   * =',
        '=* ==== * ============ * ====* =',
        '=******************* =******** =',
        '=    *     *       * =*  *     =',
        '==== * ====*  =  = * =* =*  ====',
        '****** =****  =  = **** =****** ',
        '     * =*  *$ =  = *    =*      ',
        '==== * =* =*  ==== * ====*& ====',
        '=*!****** =******************* =',
        '=*      * =            *     * =',
        '=* ==== * ============ * ====* =',
        '=**** = ******** = ***** =**** =',
        '=*  * =     *  * = *     =*  * =',
        '=* =* ===== * =* = * =====* =* =',
        '=************ =!************** =',
        '=             =                =',
        '================================',
    ], {
        // this will define the size of each tile of the wall
        tileWidth: 25,
        tileHeight: 25,

        // this will define each symbol used on the maze map, by a function returning a component list (what will be passed to add())
        tiles: {

            // wall
            "=": () => [ //each symbol represents an object
                sprite("maze-wall"),
                area(), //for collision detection
                pos(),
                scale(2.5),
                body({
                    isStatic: true
                }),
                "wall", // tag for collision detection
            ],
            // dots
            "*": () => [
                sprite("pointDot"),
                pos(15, 15),
                scale(2),
                area(),
                "pointDot", // add tag so behavior can be assigned (on collision)},
            ],
            //fruits
            "!": () => [
                sprite("apple"),
                pos(),
                scale(2),
                area(),
                "fruit", // add tag so behavior can be assigned (on collision)},
            ],
            "$": () => [
                sprite("strawberry"),
                pos(),
                scale(2),
                area(),
                "fruit", // add tag so behavior can be assigned (on collision)},
            ],
            "&": () => [
                sprite("cherry"),
                pos(),
                scale(2),
                area(),
                "fruit", // add tag so behavior can be assigned (on collision)},
            ],
            "%": () => [
                sprite("yellowFruit"),
                pos(),
                scale(2),
                area(),
                "fruit", // add tag so behavior can be assigned (on collision)},
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
    loadSound("cruising", "assets/music/cruising.mp3")

    const music = play("cruising", {
        volume: 0.8,
        loop: true
    })
    // load  the player sprite sprite 
    loadSpriteAtlas("src/sprites/player-sprite.png", {
        "player": {
            x: 0, //horizontal sprite position on the spritesheet 
            y: 0, //vertical position on spritesheet
            width: 702, //width of the spritesheet all 3 images in the animation
            height: 234, //height of the spritesheet
            sliceX: 3, //how many sprites are on the sprite sheet for this invidual animation
            anims: {
                idle: {
                    from: 1,
                    to: 2,
                    loop: true,
                    speed: 3
                },
                run: {
                    from: 2,
                    to: 0,
                    loop: true,
                    speed: 4
                }, //run animation
            },

        }
    })

    loadSprite("game-over", "src/sprites/game-over.png")

    // Load win page sprite
    loadSprite("win", "src/sprites/win.png")

    //////////////////////////// User Instructions ///////////////////////////////


    add([
        // text() component is similar to sprite() but renders text
        text("Press arrow keys to move"),
        pos(gameWidth - 20, 30),
        anchor("topright"),
        scale(.4),
    ])


    //////////////////////// Scoreboard ////////////////////////////////////////


    // Add score object to the game
    const score = add([

        // initialise the score
        text("Score: 0"),
        {
            value: 0
        },

        // scoreboard color
        color("#04FFF7"),

        // position in approx center of screen
        pos(gameWidth / 2 - 40, 30),
        anchor("center"),
        scale(.6),        
    ])


    //////////////////////// Lives ////////////////////////////////////////
    add([
        text("LIVES:", {
            size: 20
        }),
        pos(20, 20),
    ]);

    const livesText = add([
        text("3", {
            size: 20
        }),
        pos(100, 20),
    ]);

    function updateLives(life) {
        player.lives += life;
        livesText.text = player.lives.toString();
    }
    ////////////////////////////// Player ///////////////////////////////////////////////////


    // Add Player object to game
    const player = add([
        sprite("player"),
        pos(400, 350),
        area(),
        body(),
        {
            lives: 3
        },
        scale(.18),
        rotate(0), // rotate() component gives it rotation
        anchor("center"),
        "player",
    ])

    //////////////////////// Player Movement - User input /////////////////////////////////////////////////

    //starts the pacman animation
    player.play("run")

    // Define player movement speed in pixels per second
    let speedX = 0
    let speedY = 0

    // Define player movement with inputs from user
    // left
    onKeyDown("left", () => {
        // .move() is provided by pos() component, move by pixels per second
        speedX = -100
        speedY = 0
        player.angle = 180
    })

    // right
    onKeyDown("right", () => {
        speedX = 100
        speedY = 0
        player.angle = 0//changes the rotation of the object rotate(0) and anchor("center") have to be attached to object 
    })

    // up
    onKeyDown("up", () => {
        speedX = 0
        speedY = -100
        player.angle = -90
    })

    // down
    onKeyDown("down", () => {
        speedX = 0
        speedY = 100
        player.angle = 90
    })


    //////////////////////// Player Movement - Secret tunnel /////////////////////////////////////////////////


    onUpdate("player", (player) => {
        if (player.pos.x < 0) {
            let yCoord = player.pos.y
            player.moveTo(gameWidth - 10, yCoord)
        }

        if (player.pos.x > gameWidth) {
            let yCoord = player.pos.y
            player.moveTo(10, yCoord)
        }
        player.move(speedX, speedY)
        scoreText = score.value

    })


    //////////////////////// Player Action - Eat dots /////////////////////////////////////////////////


    // When player collides with a point dot, it disappears and 10 points are added to the score
    player.onCollide("pointDot", (pointDot) => {
        destroy(pointDot)

        // Increase score and update display
        score.value += 10
        score.text = "Score: " + score.value
        if (score.value >= 3010) { 
            go("win"); 
        }
    })


    //////////////////////// Player Action - Eat fruits /////////////////////////////////////////////////


    // When player collides with a fruit, it disappears and 100 points are added to the score
    player.onCollide("fruit", (fruit) => {
        destroy(fruit)

        // Increase score and update display
        score.value += 100
        score.text = "Score: " + score.value
        if (score.value >= 3010) { 
            go("win"); 
        }
    })


    //////////////////////// Player Action - Kill enemy /////////////////////////////////////////////////


    //when player collides with enemy the enemy disappears and 10 points are added to the score and
    //the kaboom explosion animation plays in the enemy position
    player.onCollide("enemy", (enemy) => {
        destroy(enemy)
        updateLives(-1);
        score.text = "Score: " + score.value
        if (player.lives == 0) {
            music.paused = true;
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
                scale(2.5),
                area(),
                body(),
                anchor("center"),
                state(direction, ["up", "right", "down", "left"]),
                {
                    defaultDirection: direction
                },
                "enemy",
            ])
        }

        // Code to make enemy turn on collision with walls. Default movement is up.
        setMovementPattern() {
            let enemySpeed = 130

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

        // Switch to opposite direction on collision with another enemy
        setEnemyCollisions() {
            this.enemy.onCollide("enemy", () => {
                if (this.enemy.state === "left") {
                    this.enemy.enterState("right")
                } else if (this.enemy.state === "right") {
                    this.enemy.enterState("left")
                } else if (this.enemy.state === "up") {
                    this.enemy.enterState("down")
                } else if (this.enemy.state === "down") {
                    this.enemy.enterState("up")
                }
            })
        }
    }


    //////////////////////////////// Create enemies /////////////////////////////////////////////////


    const newEnemy1 = new Enemy(vec2(120, 197), "up")
    const newEnemy2 = new Enemy(vec2(675, 197), "right")
    const newEnemy3 = new Enemy(vec2(675, 502), "down")
    const newEnemy4 = new Enemy(vec2(120, 502), "left")

    let enemiesList = []
    enemiesList.push(newEnemy1)
    enemiesList.push(newEnemy2)
    enemiesList.push(newEnemy3)
    enemiesList.push(newEnemy4)

    for (let en of enemiesList) {
        en.setMovementPattern()
        en.setEnemyCollisions()
    }

     loop: true
})


////////////////////////////// CREATE GAME OVER SCENE ///////////////////////////////////////


scene("over", () => {
    add([
        sprite("game-over"),
        scale(2.5),
        pos(30, 0)
    ])
    add([
        text("High Score: " + scoreText),
        pos(gameWidth / 2, gameHeight / 2 + 90),
        anchor("center"),
    ])

    add([
        text("Click To Play Again"),
        pos(gameWidth / 2, gameHeight / 2 + 170),
        anchor("center"),
    ])
    onClick(() => go("game"))

})


////////////////////////////// CREATE WIN SCENE ///////////////////////////////////////


scene("win", () => {
    add([
        sprite("win"),
        scale(.6),
        pos(gameWidth / 2, 80),
        anchor("top"),
    ])
    add([
        text("High Score: " + scoreText),
        pos(gameWidth / 2, gameHeight / 2 + 90),
        anchor("center"),
    ])

    add([
        text("Click To Play Again"),
        pos(gameWidth / 2, gameHeight / 2 + 170),
        anchor("center"),
    ])
    onClick(() => go("game"))

})


//////////////////////////////// Scene Control ///////////////////////////////////////////////


go("game")
