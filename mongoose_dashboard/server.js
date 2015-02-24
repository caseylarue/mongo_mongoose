var express = require("express");
var path = require("path");
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');

var DashboardSchema = new mongoose.Schema({
	name: String,
	description: String,
	created_at: { type: Date, default: Date.now() },
	updated_at: Date
})

DashboardSchema.path('name').required(true, 'name cannot be blank');
DashboardSchema.path('description').required(true, 'description cannot be blank');

var Mongoose_flock = mongoose.model('Mongoose_flock', DashboardSchema);

//////////////////////////////////////////

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

//////////////////////////////////////////

app.get('/', function(req, res) {
	Mongoose_flock.find({}).sort('-created_at').exec(function(err, mongoose_display) {
	 	if(err) {
      		console.log('something went wrong');
    	} else {
    		res.render('mongoose', {mongoose_display: mongoose_display});
	 	}
	 })
})

app.get('/new', function(req, res) {
 	res.render('new');
})

app.post('/new', function(req, res) {
 	console.log("POST DATA", req.body);
 	var mongoose_display = new Mongoose_flock({name: req.body.name, description: req.body.description});
 	console.log(mongoose_display);
 	mongoose_display.save(function(err) {
	    if(err) {
	      console.log('something went wrong');
	      res.render('new', {title: 'you have errors!', errors: mongoose_display.errors})
	    } 
	    else { 
	      console.log('successfully added a user!');
	      res.redirect('/');
	    }
	})
})

app.get('/mongoose/:id', function(req, res) {
	console.log(req.params.id)
	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
		console.log(mongoose_display);
		res.render('show', {mongoose_display: mongoose_display});
	})
})

app.get('/mongoose/:id/edit', function(req, res) {
	console.log(req.params.id)
	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
		console.log(mongoose_display);
		res.render('edit', {mongoose_display: mongoose_display});
	})
})

app.get('/mongoose/:id/edit', function(req, res) {
	console.log(req.params.id)
	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
		console.log(mongoose_display);
		res.render('edit', {mongoose_display: mongoose_display});
	})
})

app.post('/mongoose/:id', function(req, res){
	console.log("POST DATA", req.body);
	console.log("name", req.body.name);
	Mongoose_flock.update({_id: req.params.id}, { $set: {name: req.body.name, description: req.body.description, updated_at: Date.now()} }, function (err, mongoose_display){
			if(err) {
		      console.log('something went wrong');
		      res.render('/mongoose/:id/edit', {title: 'you have errors!', errors: mongoose_display.errors})
		    } 
		    else { 
		      console.log('successfully updated user!');
		      res.redirect('/');
		    }
		})
})

app.post('/mongoose/:id/remove', function(req, res) {
	Mongoose_flock.remove({_id: req.params.id}, function (err, mongoose_display){
		     res.redirect('/');
	})
})



// 	User.remove({_id: req.params.id}, function (err, user){
//     res.redirect('/users');
// 	})
// })


// app.post('/users', function(req, res) {
//  //console.log("POST DATA", req.body);
//   var mongoose_display = new Mongoose_flock({name: req.body.name, quote: req.body.quote});
//   mongoose_display.save(function(err) {
//     if(err) {
//       // console.log('something went wrong');
//       res.render('index', {title: 'you have errors!', errors: mongoose_display.errors})
//     } 
//     else { 
//       console.log('successfully added a user!');
//       res.redirect('/users');
//     }
// 	})
// })

// app.post('/quotes_page', function(req, res) {
// 	res.redirect('/users');
// })

// app.get('/users', function (req, res){
// 	User_quote.find({}).sort('-date').exec(function(err, users) {
// 	 	if(err) {
//       		console.log('something went wrong');
//     	} else {
//     		console.log("success", users);
//     		// res.render('users', {users: users});
//     		res.render('users', {users: users});
// 	 	}
// 	 })
	 // User_quote.find({}, function(err, users) {
	 // 	if(err) {
  //     		console.log('something went wrong');
  //   	} else {
  //   		console.log("success", users);
  //   		// res.render('users', {users: users});
  //   		res.render('users', {users: users});
	 // 	}
	 // })
// })

// app.get('/users/:id', function (req, res){
// 	// first parameter is the query document.  Second parameter is the callback
// 	User_quote.findOne({_id: req.params.id}, function (err, user){
// 		// loads a viw called 'users.ejs' and passed the user object in the view
// 		res.render('user', {user: user});
// 	})
// })



//////////////////////////////////////////

var server = app.listen(8000, function(){
	console.log("listening");
})
