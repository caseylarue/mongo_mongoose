// require mongoose which is the layer between our database and express
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

// creating the mongoose model and calling it "Friend"
module.exports = mongoose.model('Mongoose_flock', DashboardSchema);