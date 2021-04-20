let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Premenu, Menu, Menu2, Play, Play2],
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