const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config.js');
const userService = require('../services/user.service');

const { ROLE } = require('../utils/consts');

const verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!'
			});
		}
		req.userId = decoded.id;
		next();
	});
};

const isAdmin = (req, res, next) => {
	userService.getUserById(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === ROLE.ADMIN) {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require Admin Role!'
			});
			return;
		});
	});
};

const isModerator = (req, res, next) => {
	userService.getUserById(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === ROLE.MODERATOR) {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require Moderator Role!'
			});
		});
	}).catch(err => {
		throw err;
	});
};

const isModeratorOrAdmin = (req, res, next) => {
	userService.getUserById(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === ROLE.MODERATOR) {
					next();
					return;
				}

				if (roles[i].name === ROLE.ADMIN) {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require Moderator or Admin Role!'
			});
		});
	}).catch(err => {
		throw err;
	});
};

const comparePassword = (inputPassword, currentPassword) => {
	return bcrypt.compareSync(inputPassword, currentPassword);
};

const signToken = (obj, secret, config) => {
	return jwt.sign(obj, secret, config);
};

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isModerator: isModerator,
	isModeratorOrAdmin: isModeratorOrAdmin,
	comparePassword: comparePassword,
	signToken: signToken,
};

module.exports = authJwt;
