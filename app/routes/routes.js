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

	//puts newly added vendor in db
	app.post('/api/putVendors', function(req, res){
		// var name = req.name.toLowerCase();
		// Vendor.find({ name: name }, function(err, vendor){
		// 	if (err)
		// 		console.log(err)
		// 	else {
		// 		if (vendor){
		// 			console.log('vendor already exists')
		// 		} else {
					Vendor.create({
						name: req.name,
						rating: req.rating,
						favoriteFood: req.favoriteFood
					}, function(err, vendor){
						res.send(vendor);
					})
		// 		}
		// 	}
		// })
	});

	//get list of vendors currently in db
	app.get('/getVendors', function(req, res){
		Vendor.find({}, function(err, vendorList){
			if (err)
				console.log(err)
			else{
				if (!vendorList){
					console.log('No vendors')
					res.send('There are currently')
				}
			}
		})
	})



	//api's go here
};