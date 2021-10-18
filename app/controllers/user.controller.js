const userService = require('../services/user.service');
const {logger} = require('../config/logger.config');
/*
 * These are test endpoints to validate
 */
exports.allAccess = (req, res) => {
	res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
	res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
	res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send('Moderator Content.');
};

/*
 * Actual endpoints
 */

exports.getAllUsers = async (req, res) => {
	const users = await userService.getAllUsers();
	res.status(200).send({
		data: users,
	});
};

exports.findByPK = async (req, res) => {
	try {
		const user = await userService.getUserById(req.params.id);
		res.status(200).send({user});
	} catch (err) {
		logger.error(`Error when finding user with id: ${req.params.id}`, err);
		res.status(500).send({
			message: err.message,
		});
	}
};

exports.deleteUserById = async (req, res) => {
	const userId = req.params.id;
	try {
		await userService.deleteUserById(userId);
		res.status(200).send({
			message: `Resource with id: ${userId} deleted successfully`
		});
	} catch (err) {
		res.status(500).send({
			message: `Removal failed. User with id: ${userId} does not exist`
		});
	}
};

