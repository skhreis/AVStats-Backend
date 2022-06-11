const mongoose = require('mongoose')

const Favorites = mongoose.Schema(
	{
		Airports: { type: String },
		Flights: { type: String },

	},
	{ collection: 'favorite-data'}
)

const model = mongoose.model('Favorites', Favorites)

module.exports = model;