const authJwt = require('../middleware/authJwt');
const config = require('../config/auth.config');
const userService = require('../services/user.service');

const { logger } = require('../config/logger.config');

const { DURATION } = require('../utils/consts');

const loginUser = async (username, password, res) => {
	return new Promise((resolve, reject) => {
		userService.getByUserName(username).then(user => {
			if (!user) {
				res.status(404).send({
					message: 'User not found!'
				});
			}

			const passwordIsValid = authJwt.validatePassword(password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!'
				});
			}

			const token = authJwt.signToken({id: user.id}, config.secret, {
				expiresIn: DURATION.WHOLE_DAY,
			});

			const authorities = [];
			resolve(user.getRoles().then(roles => {
				for (let i = 0; i < roles.length; i++) {
					authorities.push('ROLE_' + roles[i].name.toUpperCase());
				}
				return res.status(200).send({
					id: user.id,
					username: user.username,
					email: user.email,
					roles: authorities,
					accessToken: token
				});
			}));
		}).catch(err => {
			logger.error('Error when fetching user from DB', err);
			reject(err);
		});
	});
};

module.exports = {
	loginUser,
};
