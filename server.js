var express = require('express'); //nodes way of importing 
var app = express(); //store the resulting app in var app 
var port = 8000; //setting up port, local host
var bp = require('body-parser'); // allows use to send info from the front end to the back end 
var path = require('path'); //tells where to go.
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoting_dojo', {useMongoClient:true});

//var validate = require('mongoose-validator');

//var nameValidator = [
//    validate({
//        validator: 'isLength',
//        arguments: [3, 50],
//        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
//    }),
//    validate({
//        validator: 'isAlphanumeric',
//        passIfEmpty: true,
//        message: 'Name should contain alpha-numeric characters only'
//    }),
//];

//var quoteValidator = [
//    validate({
//        validator: 'isLength',
//        arguments: [3, 400],
//        message: 'Quote should be between {ARGS[0]} and {ARGS[1]} characters' //setting character rules
//    }),
//    validate({
//        validator: 'isAlphanumeric',
//        passIfEmpty: true,
//        message: 'Quote should contain alpha-numeric characters only'
//    }),
//];

var QuoteSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 3}, //add in validate:nameValidator
    quote: {type:String, requred: true, minlength: 3} //add in quoteValidator
}, {timestamps:true});
var Quotes = mongoose.model("quotes", QuoteSchema);



app.use(bp.urlencoded());
app.use(express.static(path.join(__dirname , "/views")));
app.use(session({secret:" string "})); 
app.set("views",path.join(__dirname,"/views"));
app.set("view engine", "ejs");



//ROUTES

app.get('/', function(req, res){
    console.log(req.body);
    return res.render('index')
});



app.get("/quotes", function(req, res){
    Quotes.find({}, function(err, quotes){
        if (err){
            console.log(err);
        }
        // console.log(quotes)
        return res.render('quotes', {quotes: quotes});
    });
});

app.post('/quotes', function(req, res){
    console.log(req.body)
    Quotes.create(req.body, function(err){
        if (err) {
            console.log(err)
        };
        return res.redirect('/quotes');
    })
});


app.listen(port,function(){
    console.log('listening')
});
    