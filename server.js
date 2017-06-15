//server js will load the things we need
var express = require('express');
var app = express();

app.use(express.static('public'));

//set the view engine to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file
//index page
app.get('/', function(req,res){
    res.render('index');
});

//about me page
app.get('/about', function(req, res){
    res.render('about');
});

app.listen(3000);
console.log('Server is listening on port 3000');