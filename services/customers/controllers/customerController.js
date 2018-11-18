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
	list(req, res) {
		customerModel.find((err, customers) => {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting customer.',
					error: err
				});
			}
			return res.json(customers);
		});
	},

	/**
     * customerController.show()
     */
	show(req, res) {
		const id = req.params.id;
		customerModel.findOne({ _id: id }, (err, customer) => {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting customer.',
					error: err
				});
			}
			if (!customer) {
				return res.status(404).json({
					message: 'No such customer'
				});
			}
			return res.json(customer);
		});
	},

	/**
     * customerController.create()
     */
	create(req, res) {
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

		customer.save((err, customer) => {
			if (err) {
				return res.status(500).json({
					message: 'Error when creating customer',
					error: err
				});
			}
			return res.status(201).json(customer);
		});
	},

	/**
     * customerController.update()
     */
	update(req, res) {
		const id = req.params.id;
		customerModel.findOne({ _id: id }, (err, customer) => {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting customer',
					error: err
				});
			}
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

			customer.save((err, customer) => {
				if (err) {
					return res.status(500).json({
						message: 'Error when updating customer.',
						error: err
					});
				}

				return res.json(customer);
			});
		});
	},

	/**
     * customerController.remove()
     */
	remove(req, res) {
		const id = req.params.id;
		customerModel.findByIdAndRemove(id, (err, customer) => {
			if (err) {
				return res.status(500).json({
					message: 'Error when deleting the customer.',
					error: err
				});
			}
			return res.status(204).json();
		});
	}
};
