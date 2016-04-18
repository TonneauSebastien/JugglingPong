var game = new Phaser.Game(
    600, 
    800,
    Phaser.CANVAS, 
    'phaser-example', 
    {   preload: preload, 
        create: create, 
        update: update, 
        render: render });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('ball', 'images/magic_ball.png');
    game.load.image('pad', 'images/pad.png');
}

var ball;
var pad;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    ball = game.add.sprite(300, 400, 'ball');

    game.physics.enable(ball, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    ball.body.velocity.setTo(0, 100);
    
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.set(1);

    ball.body.gravity.set(0, 1000);

    //----------------------

    pad = game.add.sprite(300, 700, 'pad');
    game.physics.enable(pad, Phaser.Physics.ARCADE);
    pad.body.collideWorldBounds = true;
    pad.body.allowGravity = false;
    pad.body.immovable = true;
}

function update () {

    game.physics.arcade.collide(ball, pad);
    
}

function render () {

    //debug helper
    game.debug.spriteInfo(ball, 32, 32);

}