// Adrian Vasquez
// 4/21/2020
// Etimated time to completions: 12-15hrs.

/*
* I did both of the S tier options: changed the theme to a pizza delivery game
* I made all original sounds and drawings: (60 pts)
*
* I made a simoltanious 2 player mode where two seperate scores are displayed, and
* the winner is displayed when the game is over. Single player is still available:
* (30pts)
*
* I made a countdown clock that shows the player/players how much time the have left:
* (10pts)
*
* 60pts + 30pts + 10pts = 100pts
*/

let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Premenu, Menu, Menu2, Play, Play2],

    pixelArt: true,
    // scale game logic
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let 
    // Player 1 Controls
    keyLEFT, keyRIGHT, keyUP, 
    // Player 2 Controls
    keyW, keyA, keyD, 
    // Restart Button
    keyR;