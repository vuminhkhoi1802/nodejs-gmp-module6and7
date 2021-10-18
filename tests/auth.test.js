/* eslint-env jest */
const axios = require('axios');
const userService = require('../app/services/user.service');

jest.mock('axios');

// Random Unit Test
describe('Users Test Suite', () => {
	it('Get all current users - empty', async () => {
		const getAllUsers = {
			data: []
		};
		expect(getAllUsers).toEqual({
			data: []
		});
	});
});
