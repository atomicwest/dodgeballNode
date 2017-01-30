$(document).ready(function(){
    console.log("document is ready")
    $('#sendscore').on('click', function() {
        console.log("pre-AJAX")
        var score = $('form input')
        var scoreinfo = {
             name: score.name,
             score: score.score, 
             date: score.datefield
        }
       
        console.log(scoreinfo);
        
        $.ajax({
            type: 'POST',
            url: '/dodgeGame',
            data: scoreinfo,
            success: function(data){
                //restart the game
                // $('body')[0].reset();
                location.reload();
                // console.log("successful ajax")
            }
        });    
        
        return false;
        
    })
    
})