class Ship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed;;
        this.sfxExplosion = scene.sound.add('sfx_explosion');
    }

    update(){
        this.x -= this.movementSpeed;
        if(this.x < -this.width){
            this.x = game.config.width
        }
    }
    reset(){
        this.x = game.config.width + 50;
        this.alpha = 1
    }
}