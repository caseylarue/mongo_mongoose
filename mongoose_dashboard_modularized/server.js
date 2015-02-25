var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "./static")));

require('./config/routes.js')(app);

var server = app.listen(8000, function(){
	console.log("listening");
})



