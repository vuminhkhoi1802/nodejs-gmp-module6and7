const userService = require('../services/user.service');
const db = require('../models/index');

const Role = db.role;

const initUsers = async () => {
	await userService.createUser({
		'username': 'khoivuuser',
		'email': 'user@khoivu.com',
		'password': '1231415',
		'roles': ['user']
	});

	await userService.createUser({
		'username': 'khoivumod',
		'email': 'mod@khoivu.com',
		'password': '1231415',
		'roles': ['moderator']
	});

	await userService.createUser({
		'username': 'khoivuadmin',
		'email': 'admin@khoivu.com',
		'password': '1231415',
		'roles': ['admin']
	});
};

const initRoles = () => {
	Role.create({
		id: 1,
		name: 'user'
	});

	Role.create({
		id: 2,
		name: 'moderator'
	});

	Role.create({
		id: 3,
		name: 'admin'
	});
};

module.exports = {
	initRoles,
	initUsers,
};
