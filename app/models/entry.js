var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var EntrySchema = new Schema({
	rating: String,
	favoriteFood: String
})

var Entry = mongoose.model('Entry', EntrySchema);