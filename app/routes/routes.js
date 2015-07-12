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

	app.get('/api/putVendors', function(req, res){
		console.log('gets here');
		var req = {
			name: 'test',
			rating: 3.5,
			favoriteFood: 'potatoes'
		}
		Vendor.create({
			name: req.name,
			rating: req.rating,
			favoriteFood: req.favoriteFood
		}, function(err, vendor){
			console.log(vendor);
		})
	})

	//api's go here
};