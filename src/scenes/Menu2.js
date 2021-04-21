class Menu2 extends Phaser.Scene{
    constructor(){
        super("menuScene2");
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
            backgroundColor: '#CD212A',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }
        // Add instructions
        this.add.text(
            game.config.width/2, 
            game.config.height/2, 
            'Player 1: Use (A) (D) to move & (W) to fire', 
            menuConfig).setOrigin(0.5);

        this.add.text(
          game.config.width/2, 
          game.config.height/2 + borderUISize + borderPadding, 
          'Player 2: Use ← → to move & ↑ to fire', 
          menuConfig).setOrigin(0.5);

        // Add Dificulty Settings
        menuConfig.backgroundColor = '#008c45';

        this.add.text(
          game.config.width/2, 
          game.config.height/2 + borderUISize*2 + borderPadding*2, 
          'Press ← for Novice or → for Expert', 
          menuConfig).setOrigin(0.5);

        // key input configuration
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene2');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene2');    
        }
      }
}