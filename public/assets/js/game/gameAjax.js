$(document).ready(function(){
    
    $('form').on('submit', function() {
        
        var score = $('form input')
        var scoreinfo = {
             name: score.name,
             score: score.number, 
             date: score.date
        }
       
        console.log(scoreinfo);
        
        // $.ajax({
        //     type: 'POST',
        //     url: '/',
        //     data: scoreinfo,
        //     success: function(data){
        //         //restart the game
        //         // $('body')[0].reset();
        //         // location.reload()
        //     }
        // });    
    })
    
})