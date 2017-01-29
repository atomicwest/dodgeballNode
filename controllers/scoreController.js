var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://dodgeball:password@ds023694.mlab.com:23694/dodgeballbeta')
var scoreSchema = mongoose.Schema({
    name: String,
    score: Number, 
    date: Date
})

var scoreModel = mongoose.model('Score', scoreSchema);

module.exports = function(app){
    
    app.get('/', function(req,res){
        res.render('home');
    });
    
    app.get('/halloffame', function(req, res){
        scoreModel.find({}, function(err,data){
            if (err) throw err;
            res.render('halloffame', {scores:data})     
        })
        
    });
    
    app.get('/dodgeGame', function(req,res){
       res.render('dodgeG') ;
    });
    
    app.post('/dodgeGame', function(req, res){
        var newScore = scoreModel(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
}