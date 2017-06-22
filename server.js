//server js will load the things we need
var express = require('express');
const app = express();
var pg = require('pg');
var parser = require('body-parser');

app.use(parser.json());
//connect to the db
var connectionString = 
"postgres://postgres:qwerty@localhost:5432/postgres";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

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

app.get('/TermsofService', function(req,res){
    res.render('tos');
});

app.get('/blog', function(req, res){
    var query = pgClient.query("SELECT title, blogtext FROM blogposts");
    console.log("Before the Query Ends");
    query.on("row", function(row,result){
        result.addRow(row);
    });
    query.on("end", function(result){
        //return data to the page
        console.log("Should be returning data to the page right about....")
        res.render('blog', {data: result.rows});
        console.log("Now....?");
    })
    //res.render('blog');
});

app.get('/comment', function(req, res){
    res.render('comment');
});


//blog page !!!Change this for the viewing page!!!!

// app.get('/blog', function(req, res){
//     var query = pgClient.query("SELECT title, url, languages, info FROM projects");
//     query.on("row", function(row,result){
//         result.addRow(row);
//     });
//     query.on("end", function(result){
//         //return the data to the page
//         res.render('blog', { data: result.rows});
//     });
//     //res.render('blog');
// });
//pgClient.query("CREATE TABLE IF NOT EXISTS blogPosts(id SERIAL UNIQUE PRIMARY KEY, date date NOT NULL default CURRENT_DATE, title varchar(255) NOT NULL, blogtext text NOT NULL)");

app.post('/comment',function(req,res){
    console.log(req.body.titleD + " " + req.body.textD);
    pgClient.query("INSERT INTO blogPosts(id, date, title, blogtext) values(DEFAULT, DEFAULT, $1, $2)",[req.body.titleD,req.body.textD]);
    console.log("Checking...");
});


app.listen(3000);
console.log('Server is listening on port 3000');