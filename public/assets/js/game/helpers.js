//range exclusive
function randN(max, min, havezero=false){
    var num = Math.floor((max - min + 1)*Math.random()+min);
    while (num==0 & havezero===false){
        num = Math.floor((max - min + 1)*Math.random()+min);
    }
    return num;
}

function atInterval(n){
    return (gameArea.frameNum/n % 1)==0;
}

function randColor(){
    // var color = "#"
    var color = "";
    var next;
    for (var i=0; i<6; i++){
        next = randN(-1,16, true);
        (next > 9) ? color+=String.fromCharCode(next+55) : color+=next;
    }
    return color
}

module.exports = {
    randN : randN,
    atInterval : atInterval,
    randColor : randColor
}