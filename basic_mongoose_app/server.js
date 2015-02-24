var express = require("express");
var path = require("path");
var app = express();

var mongoose = require('mongoose');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	age: Number,
	date: { type: Date, default: Date.now }
})

// var UserSchema = new mongoose.Schema({
//     first_name:  String,
//     last_name: String,
//     email: String,
//     date: { type: Date, default: Date.now },
// });

// we can add validations using the .path() method.
UserSchema.path('name').required(true, 'name cannot be blank');
UserSchema.path('age').required(true, 'age cannot be blank');
// UserSchema.path('email').required(true, 'User email cannot be blank');


var User = mongoose.model('User', UserSchema);

//////////////////////////////////////////

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

//////////////////////////////////////////

app.get('/', function(req, res) {
 	res.render('index');
})

app.post('/users', function(req, res) {
 //console.log("POST DATA", req.body);
  var user = new User({name: req.body.name, age: req.body.age});
  user.save(function(err) {
    if(err) {
      // console.log('something went wrong');
      res.render('index', {title: 'you have errors!', errors: user.errors})
    } 
    else { 
      console.log('successfully added a user!');
      res.redirect('/users');
    }
})



})

app.get('/users', function (req, res){
	 User.find({}, function(err, users) {
	 	if(err) {
      		console.log('something went wrong');
    	} else {
    		console.log("success", users);
    		// res.render('users', {users: users});
    		res.render('index', {users: users});
	 	}
	 })
})

app.get('/users/:id', function (req, res){
	// first parameter is the query document.  Second parameter is the callback
	User.findOne({_id: req.params.id}, function (err, user){
		// loads a viw called 'users.ejs' and passed the user object in the view
		res.render('user', {user: user});
	})
})

app.post('/users/:id', function (req, res){
	// will not overwrite other fields
	User.update({_id: req.params.id}, {first_name: 'Carlos'}, function (err, user){
		res.redirect('/users');
	})

	User.remove({_id: req.params.id}, function (err, user){
    res.redirect('/users');
	})
})

//////////////////////////////////////////

var server = app.listen(8000, function(){
	console.log("listening");
})

