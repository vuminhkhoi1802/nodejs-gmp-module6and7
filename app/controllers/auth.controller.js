'use strict';
const {logger} = require('../config/logger.config');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const userSchema = require('../schemas/user.schema');
const { validateSchema } = require('../utils/utils');

exports.signup = async (req, res) => {
	try {
		const userSignUpSchema = userSchema.userSignUpSchema;
		const validated = validateSchema(req.body, userSignUpSchema);
		if (validated) {
			await userService.createUser(req.body);
			res.status(200).send({
				message: 'User registered successfully!'
			});
		} else {
			res.status(406).send({
				message: 'Invalid input data'
			});
		}

	} catch (err) {
		logger.error('Error when creating new User', JSON.stringify(err));
		res.status(500).send({message: err.message});
	}
};

exports.login = async (req, res) => {
	const {
		username,
		password,
	} = req.body;
	try {
		await authService.loginUser(username, password, res);
	} catch (err) {
		return res.status(500).send({
			message: err.message
		});
	}
};
