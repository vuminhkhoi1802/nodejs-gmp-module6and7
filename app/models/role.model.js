module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('roles', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING
		}
	});

	return Role;
};
