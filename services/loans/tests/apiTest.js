const request = require('supertest');
const app = require('../index.js');
const loanModel = require('../models/loanModel.js');

let loan_id;
const loan_data = {
	customerId: '5be9e18f2f980e249cf96892',
	amount: 123123.12,
	balance: 12312.12,
	term: 120,
	purpose: 'to obtain cash',
	rate: 6.5,
	maturityDate: '11/11/2028',
	orginationDate: '11/11/2018'
};

// First create record that should be deleted by end of test

/**
 * Testing create a loan endpoint
 */
describe('POST ', () => {
	it('accepts loan json post and responds with the posted json', (done) => {
		request(app)
			.post('/')
			.send(loan_data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				loan_id = res.body._id;
				done();
			});
	});
});

/**
 * Testing get all loans endpoint
 */
describe('GET /', () => {
	it('responds with json containing a list of all loans', (done) => {
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
 * Testing get a loan endpoint by id
 */
describe('GET /:id', () => {
	it('respond with json containing a single loan', (done) => {
		request(app)
			.get(`/${loan_id}`)
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
 * Testing updating a loan endpoint by id
 */
describe('PUT /:id', () => {
	it('accepts loan json put and responds with the updated record', (done) => {
		request(app)
			.put(`/${loan_id}`)
			.send(loan_data)
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
 * Testing deleting a loan endpoint by id
 */
describe('DELETE /:id', () => {
	it('delete loan by id and returns 204 status', (done) => {
		request(app).delete(`/${loan_id}`).expect(204).end((err, res) => {
			if (err) return done(err);
			done();
		});
	});
});
