'use strict';
const {logger} = require('../config/logger.config');
const authJwt = require('../middleware/authJwt');
const config = require('../config/auth.config');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const {DURATION} = require('../utils/consts');

exports.signup = async (req, res) => {
	try {
		await userService.createUser(req.body);
		res.status(200).send({
			message: 'User registered successfully!'
		});
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
		const currentUser = await userService.getByUserName(username);

		if (!currentUser) {
			return res.status(404).send({message: 'User Not found.'});
		}

		const passwordIsValid = authJwt.comparePassword(password, currentUser.password);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password!'
			});
		}

		const token = authJwt.signToken({id: currentUser.id}, config.secret, {
			expiresIn: DURATION.WHOLE_DAY,
		});

		const authorities = [];
		currentUser.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				authorities.push('ROLE_' + roles[i].name.toUpperCase());
			}
			res.status(200).send({
				id: currentUser.id,
				username: currentUser.username,
				email: currentUser.email,
				roles: authorities,
				accessToken: token
			});
		});
	} catch (err) {
		return res.status(500).send({
			message: err.message
		});
	}
};
