/* eslint-env jest */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Assertion
chai.should();
chai.use(chaiHttp);

// Seed Data initialized when init a server
describe('TEST login API /api/auth/login', () => {
	it('should login unsuccessfully', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.send({
				username: 'khoivuadmin',
				password: '1231416'
			})
			.end((err, response) => {
				response.should.have.status(401);
				response.should.be.a('object');
				response.should.have.property('message');
				done();
			});
	});
	it('should login successfully', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.send({
				username: 'khoivuadmin',
				password: '1231415'
			})
			.end((err, response) => {
				response.should.have.status(200);
				response.should.be.a('object');
				response.body.should.have.property('id');
				response.body.should.have.property('username');
				response.body.should.have.property('roles');
				response.body.should.have.property('accessToken');
				done();
			});
	});
});
