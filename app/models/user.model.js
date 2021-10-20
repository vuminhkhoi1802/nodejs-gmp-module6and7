module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		}
	});

	return User;
};
