const db = require('../models');
const Op = db.Sequelize.Op;
const Role = db.role;

const getRolesByName = async (roleName) => {
	return Role.findAll({
		where: {
			name: {
				[Op.or]: roleName,
			}
		}
	});
};

module.exports = {
	getRolesByName,
};
