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
    var tetrisBlock;

    var group;
    var cursors;

    var bounds;

    var tetrisArray;
    var canSpawnTetris;
    var randomTetris;

    game.load.image('ball', 'images/shinyball.png');
    game.load.image('pad', 'images/wizball.png');
    game.load.image('tetrisblock1', 'images/tetrisblock1.png');
    game.load.image('tetrisblock2', 'images/tetrisblock2.png');
    game.load.image('tetrisblock3', 'images/tetrisblock3.png');

    game.load.physics('physicsData', 'physics/sprites.json');
}

function create() {

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    //game.stage.backgroundColor = '#124184';

    canSpawnTetris = true;
    tetrisArray = [];

    game.physics.p2.gravity.y = 500;
    game.physics.p2.restitution = 0.7;

    //bounds = new Phaser.Rectangle(0, 0, 600, 850);

    group = game.add.physicsGroup(Phaser.Physics.P2JS);

    ball = group.create(game.world.centerX, game.world.centerY, 'ball');
    ball.body.setCircle(16);
    ball.body.fixedRotation = false;

    ball.checkWorldBounds = true;
    ball.outOfBoundsKill = true;

    //ball.input.boundsRect = bounds;

    pad = group.create(game.world.centerX, 750, 'pad');
    pad.body.setCircle(45);
    pad.body.static = true;
    pad.checkWorldBounds = true;
    pad.outOfBoundsKill = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.input.addMoveCallback(move, this);
}

function update () {

    if(ball.position.y >= game.world.height - 16){
       // ball.body.enable = false;
       //group.enableBody = false;
    }

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

                randomTetris = MathUtil.rndIntRange(1,3);
                switch(randomTetris){
                    case 1 :

                        tetrisBlock = group.create(game.world.randomX, 0, 'tetrisblock1');
                        tetrisBlock.body.clearShapes();
                        tetrisBlock.body.loadPolygon('physicsData', 'tetrisblock1');
                        tetrisBlock.body.kinematic = true;

                    break;
                    case 2 :

                        tetrisBlock = group.create(game.world.randomX, 0, 'tetrisblock2');
                        tetrisBlock.body.clearShapes();
                        tetrisBlock.body.loadPolygon('physicsData', 'tetrisblock2');
                        tetrisBlock.body.kinematic = true;

                    break;
                    case 3 :

                        tetrisBlock = group.create(game.world.randomX, 0, 'tetrisblock3');
                        tetrisBlock.body.clearShapes();
                        tetrisBlock.body.loadPolygon('physicsData', 'tetrisblock3');
                        tetrisBlock.body.kinematic = true;

                    break;
                }
                // si ca bug c'est ici !
                tetrisArray.push(tetrisBlock);
                canSpawnTetris = true;
            }, 2000);
        }

    for (var i = 0; i < tetrisArray.length; i++) {
        tetrisArray[i].body.moveDown(300);
    }    
}

function render () {

}


function move(pointer, x, y, isDown) {

    pad.body.x = x;
    pad.body.y = y;
}