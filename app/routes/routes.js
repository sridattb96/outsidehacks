// Invoke 'strict' JavaScript mode
'use strict';

var	mongoose = require('../../config/mongoose')(),
	https = require('https');

// var Place = mongoose.model('Place'),
// 	User = mongoose.model('User');

var Vendor = mongoose.model('Vendor'),
	Entry = mongoose.model('Entry');

// Define the routes module' method
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index.html');
	});

	//puts newly added vendor in db
	app.post('/api/putVendors', function(req, res){
		var name = req.body.name.toLowerCase();
		console.log(name)
		Vendor.find({ name: name }, function(err, vendor){
			if (err)
				console.log(err)
			else {
				if (vendor.length > 0){
					console.log(vendor);
					console.log('vendor already exists')
				} else {
					Vendor.create({
						name: name,
						rating: req.body.rating,
						favoriteFood: req.body.favoriteFood
					}, function(err, vendor){
						res.send(vendor);
					})
				}
			}
		})
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

	app.get('/api/putEntryAndGetAvg',function(req,res){
		//console.log('inside avg');
		//console.log('reaches Entries')
		var obj = {
			vendor: '1',
			rating: 2,
			favoriteFood:'potatoes'
		};

		Entry.create({
			vendor: obj.vendor,
			rating: obj.rating,
			favoriteFood: obj.favoriteFood
		},function(err,entry){
			if(err)
			{
				res.send(err);
			}

			if (!entry)
				console.log('didnt get stored?');


			Entry.find({ vendor: obj.vendor}, function(err, entries) {
				if (err) {
					res.send(err)
					res.json(entries); 
				}
				if (!entries)
					res.send(null)

				var rating = 0;
				console.log(entries);
				for(var i = 0; i < entries.length;i++)
				{
					console.log(entries[i].rating);
					rating = rating + entries[i].rating;
				}
				//console.log(rating);
				var avg = rating/entries.length;
				console.log(avg);

			})

		})
		

	});

};