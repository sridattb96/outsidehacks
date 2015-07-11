// Invoke 'strict' JavaScript mode
'use strict';

var	mongoose = require('../../config/mongoose')(),
	https = require('https');

// var Place = mongoose.model('Place'),
// 	User = mongoose.model('User');

var Vendor = mongoose.model('Vendor');

// Define the routes module' method
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index.html');
	});

	//api's go here
}