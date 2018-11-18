const customerModel = require('../models/customerModel.js');

/**
 * customerController.js
 *
 * @description :: Server-side logic for managing customers.
 */
module.exports = {
	/**
  * customerController.list()
  */
	async list(req, res) {
		try {
			let customers = await customerModel.find({});
			return res.json(customers);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting customer.',
				error: err
			});
		}
	},

	/**
  * customerController.show()
  */
	async show(req, res) {
		const id = req.params.id;

		try {
			let foundCustomer = await customerModel.findOne({ _id: id });
			if (!foundCustomer) {
				return res.status(404).json({
					message: 'No such customer'
				});
			}
			return res.json(foundCustomer);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting customer.',
				error: err
			});
		}
	},

	/**
  * customerController.create()
  */
	async create(req, res) {
		const customer = new customerModel({
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
			let newCustomer = await customer.save();
			return res.status(201).json(newCustomer);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when creating customer',
				error: err
			});
		}
	},

	/**
  * customerController.update()
  */
	async update(req, res) {
		const id = req.params.id;
		let customer;

		try {
			customer = await customerModel.findOne({ _id: id });
			if (!customer) {
				return res.status(404).json({
					message: 'No such customer'
				});
			}

			customer.first = req.body.first ? req.body.first : customer.first;
			customer.last = req.body.last ? req.body.last : customer.last;
			customer.street = req.body.street ? req.body.street : customer.street;
			customer.city = req.body.city ? req.body.city : customer.city;
			customer.state = req.body.state ? req.body.state : customer.state;
			customer.zip = req.body.zip ? req.body.zip : customer.zip;
			customer.date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : customer.date_of_birth;
			customer.ssn = req.body.ssn ? req.body.ssn : customer.ssn;
			customer.email = req.body.email ? req.body.email : customer.email;
		} catch (err) {
			return res.status(500).json({
				message: 'Error when getting customer',
				error: err
			});
		}

		try {
			let updatedCustomer = await customer.save();
			return res.json(updatedCustomer);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when updating customer.',
				error: err
			});
		}
	},

	/**
  * customerController.remove()
  */
	async remove(req, res) {
		const id = req.params.id;

		try {
			let deletedCustomer = await customerModel.findByIdAndRemove(id);
			return res.status(204).json(deletedCustomer);
		} catch (err) {
			return res.status(500).json({
				message: 'Error when deleting the customer.',
				error: err
			});
		}
	}
};
