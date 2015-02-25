// create a friendController object which is basically our controller in an MVC type environment
var Mongoose_flock = require('../models/mongoose.js');

var mongooseController = {};

mongooseController.show_all = function(req, res) {
	Mongoose_flock.find({}).sort('-created_at').exec(function(err, mongoose_display) {
	 	if(err) {
      		console.log('something went wrong');
    	} else {
    		res.render('mongoose', {mongoose_display: mongoose_display});
	 	}
	 })
}

mongooseController.new_page = function(req, res) {
		res.render('new');
}

mongooseController.show_one = function(req, res) {
	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
		console.log(mongoose_display);
		res.render('show', {mongoose_display: mongoose_display});
	})
}

mongooseController.add = function(req, res) {
	var mongoose_display = new Mongoose_flock({name: req.body.name, description: req.body.description});
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
}

mongooseController.show_for_edit = function(req, res) {
	Mongoose_flock.findOne({_id: req.params.id}, function (err, mongoose_display){
		console.log(mongoose_display);
		res.render('edit', {mongoose_display: mongoose_display});
	})
}

mongooseController.edit = function(req, res) {
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
	}	

mongooseController.remove = function(req, res) {
	Mongoose_flock.remove({_id: req.params.id}, function (err, mongoose_display){
		     res.redirect('/');
	})
}



module.exports = mongooseController;