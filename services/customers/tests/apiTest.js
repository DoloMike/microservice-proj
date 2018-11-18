const request = require('supertest');
const app = require('../index.js');
const customerModel = require('../models/customerModel.js');

let customer_id;
const customer_data = {
	first: 'firstnametest',
	last: 'lastnametest',
	street: 'fred hodges rd',
	city: 'lewisport',
	state: 'ky',
	zip: '42351',
	date_of_birth: '03/01/1990',
	ssn: '123456789',
	email: 'michael@roberts.com'
};

// First create record that should be deleted by end of test

/**
 * Testing create a customer endpoint
 */
describe('POST ', () => {
	it('accepts customer json post and responds with the posted json', (done) => {
		request(app)
			.post('/')
			.send(customer_data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				customer_id = res.body._id;
				done();
			});
	});
});

/**
 * Testing get all customers endpoint
 */
describe('GET /', () => {
	it('responds with json containing a list of all customers', (done) => {
		request(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				typeof res.body === 'Array';
			})
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testing get a customer endpoint by id
 */
describe('GET /:id', () => {
	it('respond with json containing a single customer', (done) => {
		request(app)
			.get(`/${customer_id}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testing updating a customer endpoint by id
 */
describe('PUT /:id', () => {
	it('accepts customer json put and responds with the updated record', (done) => {
		request(app)
			.put(`/${customer_id}`)
			.send(customer_data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testing deleting a customer endpoint by id
 */
describe('DELETE /:id', () => {
	it('delete customer by id and returns 204 status', (done) => {
		request(app).delete(`/${customer_id}`).expect(204).end((err, res) => {
			if (err) return done(err);
			done();
		});
	});
});
