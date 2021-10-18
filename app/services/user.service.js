const userRepo = require('../repository/user.repository');

const getAllUsers = async () => {
	return await userRepo.getAll();
};

const createUser = async (payload) => {
	await userRepo.createUser(payload);
};

const getByUserName = async (username) => {
	return await userRepo.getUserByLogin(username);
};

const getUserById = async (id) => {
	return await userRepo.getUserById(id);
};

const deleteUserById = async (id) => {
	await userRepo.deleteUserById(id);
};

module.exports = {
	getAllUsers,
	createUser,
	getByUserName,
	getUserById,
	deleteUserById,
};
