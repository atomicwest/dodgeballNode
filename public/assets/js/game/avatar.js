function avatar(color, radius, x, y, vx=0, vy=0){
    this.color = color;
    this.radius = radius,
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.fillArc
    this.updateLoc = function(){
        this.x += vx;
        this.y += vy;
    };
    this.collision = function(impactor){
        var selfL = this.x - radius;
        var selfR = this.x + radius;
        var selfT = this.y - radius;
        var selfB = this.y + radius;
        var otherL = impactor.x - impactor.radius;
        var otherR = impactor.x + impactor.radius;
        var otherT = impactor.y - impactor.radius;
        var otherB = impactor.y + impactor.radius;
        var hit = false;
        
        if ((selfL < otherR) || (selfR > otherL ) || (selfT > otherB) || (selfB < otherT)) {
            hit = true;
        }
        return hit;
    }
}

module.exports(avatar);