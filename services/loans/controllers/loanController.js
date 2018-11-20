const loanModel = require('../models/loanModel.js');

/**
 * loanController.js
 *
 * @description :: Server-side logic for managing loans.
 */
module.exports = {
	/**
  * loanController.list()
  */
	async list(req, res) {
		try {
			let loans = await loanModel.find({});
			return res.json(loans);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting loan.',
				error: err
			});
		}
	},

	/**
  * loanController.show()
  */
	async show(req, res) {
		const id = req.params.id;

		try {
			let foundloan = await loanModel.findOne({ _id: id });
			if (!foundloan) {
				return res.status(404).json({
					message: 'No such loan'
				});
			}
			return res.json(foundloan);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting loan.',
				error: err
			});
		}
	},

	/**
  * loanController.create()
  */
	async create(req, res) {
		const loan = new loanModel({
			customerId: req.body.customerId,
			amount: req.body.amount,
			balance: req.body.balance,
			term: req.body.term,
			purpose: req.body.purpose,
			rate: req.body.rate,
			maturityDate: req.body.maturityDate,
			orginationDate: req.body.orginationDate
		});

		try {
			let newloan = await loan.save();
			return res.status(201).json(newloan);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when creating loan',
				error: err
			});
		}
	},

	/**
  * loanController.update()
  */
	async update(req, res) {
		const id = req.params.id;
		let loan;

		try {
			loan = await loanModel.findOne({ _id: id });
			if (!loan) {
				return res.status(404).json({
					message: 'No such loan'
				});
			}

			loan.customerId = req.body.customerId ? req.body.customerId : loan.customerId;
			loan.amount = req.body.amount ? req.body.amount : loan.amount;
			loan.balance = req.body.balance ? req.body.balance : loan.balance;
			loan.term = req.body.term ? req.body.term : loan.term;
			loan.purpose = req.body.purpose ? req.body.purpose : loan.purpose;
			loan.rate = req.body.rate ? req.body.rate : loan.rate;
			loan.maturityDate = req.body.maturityDate ? req.body.maturityDate : loan.maturityDate;
			loan.orginationDate = req.body.orginationDate ? req.body.orginationDate : loan.orginationDate;
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting loan',
				error: err
			});
		}

		try {
			let updatedloan = await loan.save();
			return res.json(updatedloan);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when updating loan.',
				error: err
			});
		}
	},

	/**
  * loanController.remove()
  */
	async remove(req, res) {
		const id = req.params.id;

		try {
			let deletedloan = await loanModel.findByIdAndRemove(id);
			return res.json(deletedloan);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when deleting the loan.',
				error: err
			});
		}
	}
};
