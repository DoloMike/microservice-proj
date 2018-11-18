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
			first: req.body.first,
			last: req.body.last,
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
			date_of_birth: req.body.date_of_birth,
			ssn: req.body.ssn,
			email: req.body.email
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

			loan.first = req.body.first ? req.body.first : loan.first;
			loan.last = req.body.last ? req.body.last : loan.last;
			loan.street = req.body.street ? req.body.street : loan.street;
			loan.city = req.body.city ? req.body.city : loan.city;
			loan.state = req.body.state ? req.body.state : loan.state;
			loan.zip = req.body.zip ? req.body.zip : loan.zip;
			loan.date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : loan.date_of_birth;
			loan.ssn = req.body.ssn ? req.body.ssn : loan.ssn;
			loan.email = req.body.email ? req.body.email : loan.email;
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
			return res.status(204).json(deletedloan);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when deleting the loan.',
				error: err
			});
		}
	}
};
