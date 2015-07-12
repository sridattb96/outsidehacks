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
		// var name = req.body.name.toLowerCase();
		// console.log(name)
		// Vendor.find({ name: name }, function(err, vendor){
		// 	if (err)
		// 		console.log(err)
		// 	else {
		// 		if (vendor){
		// 			console.log(vendor);
		// 			console.log('vendor already exists')
		// 		} else {
					Vendor.create({
						name: req.body.name,
						rating: req.body.rating,
						favoriteFood: req.body.favoriteFood
					}, function(err, vendor){
						res.send(vendor);
					})
		// 		}
		// 	}
		// })
	});

	//get list of vendors currently in db
	app.get('/api/getVendors', function(req, res){
		Vendor.find({}, function(err, vendor){
			if (err){
				res.send(err)
			}

			if (!vendor){
				console.log('da fuq')
				res.send(null);
			}

			res.send(vendor);
		})
	});

};