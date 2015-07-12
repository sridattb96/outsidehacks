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
	app.post('/api/putVendors/:fingerprint', function(req, res){
		var name = req.body.name.toLowerCase();
		//console.log(name)
		console.log('fingerprint: ' + req.params.fingerprint);
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
						favoriteFood: req.body.favoriteFood,
						numberVisited: 1,
						seen: [req.params.fingerprint]
					}, function(err, vendor){
						res.send(vendor);
						Entry.create({
							vendor: vendor._id,
							rating: req.body.rating,
							favoriteFood: req.body.favoriteFood
						})
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

	app.post('/api/putEntryAndGetAvg/:fingerprint',function(req,res){

		Entry.create({
			vendor: req.body.vendor,
			rating: req.body.rating,
			favoriteFood: req.body.favoriteFood
		},function(err,entry){
			if(err)
			{
				res.send(err);
			}

			if (!entry)
				console.log('didnt get stored?');


			Entry.find({ vendor: req.body.vendor}, function(err, entries) {
				if (err) {
					res.send(err)
					res.json(entries); 
				}
				if (!entries)
					res.send(null)

				var rating = 0;
				var obj = {};

				console.log('# entries: ' + entries);
				for(var i = 0; i < entries.length;i++)
				{
					//console.log(entries[i].rating);
					rating = rating + entries[i].rating;
					if(obj.hasOwnProperty(entries[i].favoriteFood)){
						obj[entries[i].favoriteFood]++;
						console.log('increase');
					} else {
						obj[entries[i].favoriteFood]=1;
					}
				}
				var max = entries[0].favoriteFood;
				for (var i = 0; i<entries.length-1; i++)
				{
					if(obj[entries[i].favoriteFood] < obj[entries[i+1].favoriteFood])
					{
						max = entries[i+1].favoriteFood;
					}
				}
				var avg = rating/entries.length;
				console.log('average: ' + avg);

				Vendor.findOne({ _id: req.body.vendor },function(err,vendor){
					if (err)
						console.log(err);

					if (!vendor)
						console.log('no vendor matches ')

					vendor.rating = avg;
					vendor.favoriteFood = max;
					vendor.numberVisited = entries.length;
					console.log(req.params.fingerprint);
					vendor.seen.push(req.params.fingerprint);
					//console.log(entries.length);
					vendor.save();
					res.send(vendor)
				})
			})
		})
	});

};