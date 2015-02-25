var mongooseController = require('../controllers/mongooses.js');

module.exports = function(app) {

	app.get('/', function(req, res) {
		mongooseController.show_all(req, res);
	})

	app.get('/new', function(req, res) {
 		mongooseController.new_page(req, res);
	})

	app.post('/new', function(req, res) {
	 	mongooseController.add(req, res);
	})

	app.get('/mongoose/:id', function(req, res) {
		mongooseController.show_one(req, res);
	})

	app.get('/mongoose/:id/edit', function(req, res) {
		mongooseController.show_for_edit(req, res);
	})

	app.post('/mongoose/:id', function(req, res){
		mongooseController.edit(req, res);
	})

	app.post('/mongoose/:id/remove', function(req, res) {
		mongooseController.remove(req, res);
	})
}







/////////////////////////////////////////////
// app.get('/', function(req, res) {
// 	Mongoose_flock.find({}).sort('-created_at').exec(function(err, mongoose_display) {
// 	 	if(err) {
//       		console.log('something went wrong');
//     	} else {
//     		res.render('mongoose', {mongoose_display: mongoose_display});
// 	 	}
// 	 })
// })

// app.get('/new', function(req, res) {
//  	res.render('new');
// })


// app.post('/new', function(req, res) {
//  	console.log("POST DATA", req.body);
//  	var mongoose_display = new Mongoose_flock({name: req.body.name, description: req.body.description});
//  	mongoose_display.save(function(err) {
// 	    if(err) {
// 	      console.log('something went wrong');
// 	      res.render('new', {title: 'you have errors!', errors: mongoose_display.errors})
// 	    } 
// 	    else { 
// 	      console.log('successfully added a user!');
// 	      res.redirect('/');
// 	    }
// 	})
// })


// show_one
// app.get('/mongoose/:id', function(req, res) {
// 	console.log(req.params.id)
// 	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
// 		console.log(mongoose_display);
// 		res.render('show', {mongoose_display: mongoose_display});
// 	})
// })

// show_edit
// app.get('/mongoose/:id/edit', function(req, res) {
// 	console.log(req.params.id)
// 	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
// 		console.log(mongoose_display);
// 		res.render('edit', {mongoose_display: mongoose_display});
// 	})
// })

// edit
// app.post('/mongoose/:id', function(req, res){
// 	console.log("POST DATA", req.body);
// 	console.log("name", req.body.name);
// 	Mongoose_flock.update({_id: req.params.id}, { $set: {name: req.body.name, description: req.body.description, updated_at: Date.now()} }, function (err, mongoose_display){
// 			if(err) {
// 		      console.log('something went wrong');
// 		      res.render('/mongoose/:id/edit', {title: 'you have errors!', errors: mongoose_display.errors})
// 		    } 
// 		    else { 
// 		      console.log('successfully updated user!');
// 		      res.redirect('/');
// 		    }
// 		})
// })
