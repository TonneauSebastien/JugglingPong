var game = new Phaser.Game(
    600, 
    800,
    Phaser.AUTO, 
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

    var ball;
    var pad;
    var tetris1;
    var tetris2;
    var tetris3;

    var group;
    var cursors;

    var tetrisArray;
    var canSpawnTetris;

    game.load.image('ball', 'images/magic_ball.png');
    game.load.image('pad', 'images/pad2.png');
    game.load.image('tetrisblock1', 'images/tetrisblock1.png');
    game.load.image('tetrisblock2', 'images/tetrisblock2.png');
    game.load.image('tetrisblock3', 'images/tetrisblock3.png');

    game.load.physics('physicsData', 'physics/sprites.json');
}

/*var ball;
var pad;
var spritePad;

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



    var pad = game.add.graphics();
    pad.lineStyle(6,0xBADA55);
    pad.drawEllipse(0, 0, 55, 15);

    spritePad = game.add.sprite(game.world.centerX, 750);

    game.physics.enable(spritePad, Phaser.Physics.ARCADE);
    spritePad.body.immovable = true;

    console.log( game.world )


    spritePad.addChild(pad);
}*/

function create() {

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    //game.stage.backgroundColor = '#124184';

    canSpawnTetris = true;
    tetrisArray = [];

    game.physics.p2.gravity.y = 500;
    game.physics.p2.restitution = 1;

    group = game.add.physicsGroup(Phaser.Physics.P2JS);

    ball = group.create(game.world.centerX, game.world.centerY, 'ball');
    ball.body.setCircle(20);
    ball.body.fixedRotation = true;


    pad = group.create(game.world.centerX, 750, 'pad');
    pad.body.clearShapes();
    pad.body.loadPolygon('physicsData', 'pad');
    pad.body.static = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.input.addMoveCallback(move, this);
}

function update () {

    //game.physics.arcade.collide(ball, spritePad);
    pad.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        pad.body.moveLeft(500);
    }
    else if (cursors.right.isDown)
    {
        pad.body.moveRight(500);
    }
    if (cursors.up.isDown)
    {
        pad.body.moveUp(500);
    }
    else if (cursors.down.isDown)
    {
        pad.body.moveDown(500);
    }
    
    if (canSpawnTetris) {

        canSpawnTetris = false;

        setTimeout(function() {
            tetris1 = group.create(game.world.randomX, 0, 'tetrisblock1');
            tetris1.body.clearShapes();
            tetris1.body.loadPolygon('physicsData', 'tetrisblock1');
            tetris1.body.kinematic = true;

            tetrisArray.push(tetris1);

            canSpawnTetris = true;
        }, 2000);
    }

    for (var i = 0; i < tetrisArray.length; i++) {
        tetrisArray[i].body.moveDown(300);
    }    
}

function render () {

    //debug helper
    //game.debug.spriteInfo(ball, 32, 32);

}


function move(pointer, x, y, isDown) {

    pad.body.x = x;
    pad.body.y = y;
}