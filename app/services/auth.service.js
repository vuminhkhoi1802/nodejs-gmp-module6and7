const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authJwt = require('../middleware/authJwt');
const config = require('../config/auth.config');
const userService = require('../services/user.service');

const { DURATION } = require('../utils/consts');

const loginUser = async (username, password, res) => {
	return new Promise((resolve, reject) => {
		userService.getByUserName(username);
	});
};

module.exports = {
	loginUser,
};
