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

				V




			})

		})
		

	});

	//api's go here
};