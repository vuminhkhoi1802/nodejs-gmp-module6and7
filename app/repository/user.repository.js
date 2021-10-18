const {v4} = require('uuid');
const bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;



const getAll = () => {
	return User.findAll({
		attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
	});
};

const getUserById = (userId) => {
	return User.findOne({
		where: {
			id: userId,
		},
	}).catch(err => err);
};

const getUserByLogin = (username) => {
	return User.findOne({
		where: {
			username,
		}
	}).catch(err => err);
};

const createUser = async (payload) => {
	const inputRoles = payload.roles;
	User.create({
		id: v4(),
		username: payload.username,
		email: payload.email,
		password: bcrypt.hashSync(payload.password, 8),
	}).then(async user => {
		if (inputRoles) {
			Role.findAll({
				where: {
					name: {
						[Op.or]: inputRoles
					}
				}
			}).then(async roles => {
				await user.setRoles(roles);
			});
		} else {
			await user.setRoles([1]);
		}
	});
};

const updateUserById = async (userId, payload) => {
	const updatedObj = {
		updatedAt: Date(),
	};
	await User.update(Object.assign({}, updatedObj, payload), {where: {id: userId}});
};

const deleteUserById = async (userId) => {
	await User.destroy({where: {id: userId}});
};


module.exports = {
	getAll,
	createUser,
	updateUserById,
	deleteUserById,
	getUserById,
	getUserByLogin
};
