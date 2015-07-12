var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var EntrySchema = new Schema({
	vendor: String,
	rating: Number,
	favoriteFood: String
})

var Entry = mongoose.model('Entry', EntrySchema);