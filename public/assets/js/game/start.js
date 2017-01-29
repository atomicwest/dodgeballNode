var Player = require('avatar')

var updateGameArea = require('updateGame');

var p1;

var gameArea = {
    dodgeballs: [],
    score: 0,
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getcontext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[1]);
        
        this.interval = setInterval(updateGameArea, 25);
        this.frameNum = 0;
        
        window.addEventListener('mousemove', function(e){
            gameArea.x = e.pageX;
            gameArea.y = e.pageY;
        });
    },
    
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    
    stop: function(){
        clearInterval(this.interval);
    }
}

function startGame() {
    p1 = new Player();
    gameArea.start();
}

module.exports(startGame);