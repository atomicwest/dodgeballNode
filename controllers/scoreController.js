var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://dodgeball:password@ds023694.mlab.com:23694/dodgeballbeta');
var scoreSchema = mongoose.Schema({
    // name: String
    name: {type: String, min: 1, max: 60, required: true},
    score: Number, 
    date: String
});

var scoreModel = mongoose.model('Score', scoreSchema);
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    app.get('/', function(req,res){
        res.render('home');
    });
    
    app.get('/halloffame', function(req, res){
        scoreModel.find( function(err,data){
            if (err) throw err;
            console.log(data)
            res.render('halloffame', {scores:data})     
        }).sort({score: -1})
        
    });
    
    app.get('/dodgeGame', function(req,res){
       res.render('dodgeG') ;
    });
    
    app.post('/dodgeGame', urlencodedParser, function(req, res){
        objview(req.body);
        var newScore = scoreModel(req.body).save(function(err, data){
            console.log(data);
            if (err) throw err;
            // res.json(data);
            res.render('home');
        });
    });
}


function objview(obj) {
  for (var key in obj) {
      if (obj.hasOwnProperty(key)){
          console.log(key + ": " + obj[key]);
       }
      }
  }
  
