var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var VendorSchema = new Schema({
	name : String,
	rating: Number,
	favoriteFood: String,
	numberVisited: Number,
	seen: Array
})

var Vendor = mongoose.model('Vendor', VendorSchema);