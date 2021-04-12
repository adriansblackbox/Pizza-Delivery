let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Play, Menu],
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyR, keyF;