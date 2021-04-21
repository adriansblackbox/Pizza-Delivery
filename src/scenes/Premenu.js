class Premenu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        // load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_select', 'assets/explosion_explosion38.wav');
        //this.load.audio('sfx_rocket', 'assets/pizzatoss.wav');
    }
    create(){
        // Menu font size and style settings
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#CD212A',
            color: '#FFFFFF',
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
            'PIZZA  DELIVERY', 
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#008c45';

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