class Premenu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        // load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_select', 'assets/explosion_explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }
    create(){
        // Menu font size and style settings
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }

        // Add title
        this.add.text(
            game.config.width/2, 
            game.config.height/2 - borderUISize - borderPadding, 
            'ROCKET PATROL', 
            menuConfig).setOrigin(0.5);
        this.add.text(
            game.config.width/2, 
            game.config.height/2, 
            'Press ← for single player or → for two players', 
            menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          
          this.sound.play('sfx_select');
          this.scene.start('menuScene1');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.sound.play('sfx_select');
          this.scene.start('menuScene2');    
        }
      }
}