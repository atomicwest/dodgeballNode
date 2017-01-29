var helpers = require('helpers');
var randN = helpers.randN;
var randColor = helpers.randColor;
var atInterval = helpers.atInterval;

function updategame(){
    var w,h;
    
    document.getElementById("score").innerHTML = gameArea.score;
    
    for(var i=0; i<gameArea.dodgeballs.length; i++){
        if(p1.collision(gameArea.dodgeballs[i])){
            gameArea.stop();
            return;
        }
        if ((dodgeballs[i].x > gameArea.canvas.width) || (dodgeballs[i].y > gameArea.canvas.height)){
            gameArea.score += 1;
            gameArea.dodgeballs.splice(i,1);
        }
    }
    
    gameArea.clear();
    gameArea.frameNum+=1;
    
    // create dodgeballs every 50ms
    // also fit countdown logic here
    if ((gameArea.frameNum==1 || atInterval(20))){
        h = gameArea.canvas.height;
        var xstart = randN(200,400);
        var radius = randN(10,40);
        var randVx = randN(-12,15);
        var randVy = randN(1,13);
        var rcolor = randColor();
        gameArea.dodgeballs.push( new avatar(rcolor,radius,xstart,-200, randVx, randVy))
    }
    
    for (var j=0; j<gameArea.dodgeballs.length; j++){
        gameArea.dodgeballs[i].x += gameArea.dodgeballs[i].vx;
        gameArea.dodgeballs[i].y += gameArea.dodgeballs[i].vy;
        gameArea.dodgeballs[i].update();
    }
    
    p1.x = gameArea.x;
    p1.y = gameArea.y;
    
    p1.update();
}


module.exports(updategame);


