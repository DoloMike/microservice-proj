const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	first: String,
	last: String,
	street: String,
	city: String,
	state: String,
	zip: String,
	date_of_birth: Date,
	ssn: String,
	email: String
});

module.exports = mongoose.model('customer', customerSchema);
