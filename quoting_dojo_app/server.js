var express = require("express");
var path = require("path");
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	quote: String,
	date: { type: Date, default: Date.now }
})

UserSchema.path('name').required(true, 'name cannot be blank');
UserSchema.path('quote').required(true, 'quote cannot be blank');

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
  var user = new User({name: req.body.name, quote: req.body.quote});
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

app.post('/quotes_page', function(req, res) {
	res.redirect('/users');
})

app.get('/users', function (req, res){
	 User.find({}, function(err, users) {
	 	if(err) {
      		console.log('something went wrong');
    	} else {
    		console.log("success", users);
    		// res.render('users', {users: users});
    		res.render('users', {users: users});
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
