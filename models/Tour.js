const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Just like creating an object of Schema class and assigning variables to it.
const tourSchema = new Schema({
	safari_tour_type: {
		type: Date,
		required: true,
	  },
});

//table name in mongoDB to be stored the above data, Schema name

const Tour = mongoose.model("SafariTours", tourSchema);

module.exports = Tour;
