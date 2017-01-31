//---------------------------------------------------------------------

function appendForm(date, score){
    
    var ccontainer = document.createElement("div");
    ccontainer.setAttribute("class", "centerform");
    ccontainer.setAttribute("id", "centerform");
    document.getElementById("gameblock").appendChild(ccontainer);
    
    var newform = document.createElement("form");
    newform.setAttribute("method", "post");
    newform.setAttribute("action", "/dodgeGame");
    newform.setAttribute("id", "scoresubmit");
    document.getElementById("centerform").appendChild(newform);
    
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

module.exports = {
    appendForm: appendForm()
};