var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var VendorSchema = new Schema({
	name : String
})

var Vendor = mongoose.model('Vendor', VendorSchema);