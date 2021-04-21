class Play2 extends Phaser.Scene {
    constructor(){
        super("playScene2");
    }
    preload(){
        this.load.image('starfield', 'assets/pizzatable.png');
        this.load.image('rocket', 'assets/pizza.png');
        this.load.image('spaceship', 'assets/pizzabox.png');
        this.load.spritesheet('explosion', 'assets/pizzaboxani.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});

        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }

    create(){
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);

        // configure rocket
        this.p1rocket = new Rocket(
            this, game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 
            'rocket');
        
        this.p2rocket = new Rocket2(
            this, game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 
            'rocket');

        // configure ships
        this.ship1 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // green rectangle at the top
        //this.add.rectangle(0, borderUISize + borderPadding, 
                          // game.config.width, borderUISize * 2, 
                           //0xCD212A).setOrigin(0,0);
        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // configure keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // configure animations for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4, first: 0}),
            frameRate: 10
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // configure score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }


        
        // display p1 score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // display p2 score
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*10, borderUISize + borderPadding*2, this.p2Score, scoreConfig);

        // GAME OVER logic
        this.p1Wins = false;
        this.tie = false;
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

            if(this.p1Wins && !this.tie){
                this.add.text(
                    game.config.width/2, 
                    game.config.height/2, 
                    'PLAYER 1 WINS', scoreConfig).setOrigin(0.5);
            }
            if(!this.p1Wins && !this.tie){
                this.add.text(
                    game.config.width/2, 
                    game.config.height/2, 
                    'PLAYER 2 WINS', scoreConfig).setOrigin(0.5);
            }
            if(this.tie){
                console.log(this.p1Score + " " + this.p2Score);
                this.add.text(
                    game.config.width/2, 
                    game.config.height/2, 
                    "IT'S A TIE", scoreConfig).setOrigin(0.5);
            }
            this.add.text(
                game.config.width/2, 
                game.config.height/2 + 64, 
                'Press (R) to Restart or ← for Menu', 
                scoreConfig).setOrigin(0.5);

            this.gameOver = true;

        }, null, this);


        if(game.settings.gameTimer == 60000){
            this.timeLeft = 60;
        }else if (game.settings.gameTimer == 45000){
            this.timeLeft = 45;
        }


        // Each 1000 ms call onEvent
        this.timeRemaining = this.add.text(game.config.width/2, borderUISize + borderPadding*2, this.timeLeft, scoreConfig);
        //this.timeRemaining.text = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
    }


    // called every frame
    update(){
        // restart configuration
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // menue select from game over
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // starfield movement
        this.starfield.tilePositionX -= 1.5;

        // freeze assets if game is over, otherwise, update positions
        if (!this.gameOver) {               
            this.p1rocket.update();
            this.p2rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        } 

        // Player 1 collision detection
        if(this.checkCollision(this.p1rocket, this.ship3)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship3);   

            this.p1Score += this.ship3.points;
            this.scoreLeft.text = this.p1Score; 
        }
        if (this.checkCollision(this.p1rocket, this.ship2)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship2);
            
            this.p1Score += this.ship2.points;
            this.scoreLeft.text = this.p1Score; 
        }
        if (this.checkCollision(this.p1rocket, this.ship1)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship1);

            this.p1Score += this.ship1.points;
            this.scoreLeft.text = this.p1Score; 
        }

        // Player 2 collision detection
        if(this.checkCollision(this.p2rocket, this.ship3)) {
            this.p2rocket.reset();
            this.shipExplode(this.ship3);   

            this.p2Score += this.ship3.points;
            this.scoreRight.text = this.p2Score; 
        }
        if (this.checkCollision(this.p2rocket, this.ship2)) {
            this.p2rocket.reset();
            this.shipExplode(this.ship2);
            
            this.p2Score += this.ship2.points;
            this.scoreRight.text = this.p2Score; 
        }
        if (this.checkCollision(this.p2rocket, this.ship1)) {
            this.p2rocket.reset();
            this.shipExplode(this.ship1);

            this.p2Score += this.ship1.points;
            this.scoreRight.text = this.p2Score; 
        }
        if(this.p1Score > this.p2Score){
            this.p1Wins = true;
            this.tie = false;
        }else if(this.p1Score < this.p2Score){
            this.p1Wins = false;
            this.tie = false;
        }else{
            this.tie = true;
        }
    }

    // collision logic 
    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        }else{
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily make ship transparent
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // play explosion sound and animation
        boom.anims.play('explode');
        ship.sfxExplosion.play();           
        boom.on('animationcomplete', () => {
          ship.reset();
          ship.alpha = 1;
          boom.destroy();
        });       
        
      }
}