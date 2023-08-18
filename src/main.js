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