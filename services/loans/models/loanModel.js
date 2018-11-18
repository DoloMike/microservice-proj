const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'customer'
	},
	amount: Number,
	balance: Number,
	term: Number,
	purpose: String,
	rate: Number,
	maturityDate: Date,
	orginationDate: Date
});

module.exports = mongoose.model('loan', loanSchema);
