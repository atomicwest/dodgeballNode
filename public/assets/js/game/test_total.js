var gamepieceA, score=0, dodgeballs=[];


function avatar(width, height, color, x, y, vx=0, vy=0){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.update = function() {
        var ctx = gameArea.context;
        ctx.fillStyle = this.color;
        // use width = -1 and height = radius for creating circles
        if (this.width == -1) {
            var circle = new Path2D();
            circle.arc(this.x, this.y, this.height, 0, 2 * Math.PI);
            ctx.fill(circle);
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    this.newLoc = function(){
        this.x += this.vx;
        this.y += this.vy;
    }

    this.collide = function(impactor) {
        var selfL = this.x;
        var selfR = this.x + this.height;
        var selfU = this.y;
        var selfD = this.y + this.height;
        var otherL = impactor.x;
        var otherR = impactor.x + impactor.height;
        var otherU = impactor.y;
        var otherD = impactor.y + impactor.height;
        // var hit = true;

        // if ((selfL > otherR) || (selfR < otherL) || (selfU > otherD) || (selfD < otherU)) {
        //     hit = false;
        // }
        // return hit
        var hit = false;
        
        if (((selfL < otherR) & (selfR > otherL )) & ((selfU < otherD) & (selfD > otherU))){
            hit = true;
        }
        return hit;
    }
}

//---------------------------------------------------------------------

var gameArea = {
    // canvas: document.createElement("canvas"),
    canvas: document.getElementById("gamecanvas"),
    start: function(){
        // this.canvas.width = 640;
        // this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);
        this.frameNum = 0;

        $( document.body ).on( "mousemove", function( event ) {
          gameArea.x = event.clientX - $("#gamecanvas").offset().left;
          gameArea.y = event.clientY - $("#gamecanvas").offset().top;
        });


    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        // document.getElementById("test").innerHTML = "asdf"
        clearInterval(this.interval);
        
        //pass something to a DOM element to trigger an event listener
        endgame()
    }
}

//---------------------------------------------------------------------

function endgame() {
    var date = new Date();
    var canv = document.getElementById("canvasdiv");
    var childgame = document.getElementById("gamecanvas");
    // document.getElementById("test").innerHTML = childgame;
    // canv.removeChild(childgame);
    
    var newform = document.createElement("form");
    newform.setAttribute("method", "post");
    newform.setAttribute("action", "/dodgeGame");
    newform.setAttribute("id", "scoresubmit");
    document.getElementById("gameblock").appendChild(newform);
    
    var frmname = document.createElement("input");
    frmname.setAttribute("type", "text");
    frmname.setAttribute("id", "scorename");
    frmname.setAttribute("name", "name");
    frmname.setAttribute("placeholder", "Enter Your Name");
    document.getElementById("scoresubmit").appendChild(frmname);

    var scorefield = document.createElement("input");
    scorefield.setAttribute("type", "text");
    scorefield.setAttribute("id", "scorefield");
    scorefield.setAttribute("name", "score");
    scorefield.setAttribute("value", score);
    scorefield.setAttribute("readonly", "readonly");
    document.getElementById("scoresubmit").appendChild(scorefield);
    
    var datefield = document.createElement("input");
    datefield.setAttribute("type", "text");
    datefield.setAttribute("id", "datefield");
    datefield.setAttribute("name", "datefield");
    datefield.setAttribute("value", date.toString());
    datefield.setAttribute("readonly", "readonly");
    document.getElementById("scoresubmit").appendChild(datefield);
    
   
    
    var subbutton = document.createElement("button");
    subbutton.setAttribute("type", "submit");
    subbutton.setAttribute("id", "sendscore");
    subbutton.setAttribute("class", "btn btn-secondary");
    subbutton.innerHTML = "Add to Hall of Fame";
    document.getElementById("scoresubmit").appendChild(subbutton);
    
}


//---------------------------------------------------------------------

function atInterval(n){
    if (gameArea.frameNum/n % 1 == 0){
        return true;
    } else {
        return false;
    }
}

//---------------------------------------------------------------------
//inclusive range
function randN(min,max){
    var num = Math.floor(Math.random()*(max-min+1)+min);
    while (num==0) {
        num = Math.floor(Math.random()*(max-min+1)+min);
    }
    return num
}

//---------------------------------------------------------------------

function randColor(){
    var color = "#"
    // var color = ""
    for (var j=0 ; j<6; j++){
        var next = randN(0,15);
        (next > 9) ? color+=String.fromCharCode(next+55):color+=next;
    }
    return color;
}

//---------------------------------------------------------------------

function updateGameArea() {
    // comment out .clear() for a continuous line

    var w,h;

    document.getElementById("score").innerHTML = score;

    for(var i=0; i<dodgeballs.length; i++){
        if (gamepieceA.collide(dodgeballs[i])) {
           gameArea.stop();
           return;
        }

        if ((dodgeballs[i].x > gameArea.canvas.width) || (dodgeballs[i].y > gameArea.canvas.height)) {
            score+=1;
            dodgeballs.splice(i,1);
        }
    }

    gameArea.clear();
    gameArea.frameNum += 1;

    //create a comet every half second
    if ((gameArea.frameNum==1) || atInterval(25)){

        h = gameArea.canvas.height;
        var xstart = randN(200,400)
        var radius = randN(10,40);
        var randvx = randN(-5,5)
        var randvy = randN(-10,10)
        var rcolor = randColor()
        console.log(rcolor)
        dodgeballs.push(new avatar(-1, radius, rcolor, xstart, -20, randvx, randvy))
    }

    for (var i=0; i < dodgeballs.length; i++){
        //use below  for jitter
        // dodgeballs[i].x += randN(2,10)
        // dodgeballs[i].y += randN(2,10)
        dodgeballs[i].x += dodgeballs[i].vx;
        dodgeballs[i].y += dodgeballs[i].vy;
        dodgeballs[i].update();
    }

    gamepieceA.x = gameArea.x;
    gamepieceA.y = gameArea.y;

    // gamepieceA.newLoc();

    gamepieceA.update();

}

//---------------------------------------------------------------------

function startGame() {

    gamepieceA = new avatar(-1, 10, randColor(), 0, 0);

    // score = new
    gameArea.start();
}

// module.exports(startGame);