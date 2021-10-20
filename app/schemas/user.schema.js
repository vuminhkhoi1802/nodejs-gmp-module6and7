const Joi = require('joi');

const userSignUpSchema = Joi.object({
	username: Joi.string().required().min(5).max(16),
	password: Joi.string().required().min(5).max(20),
	email: Joi.string().email(),
	roles: Joi.array().items(Joi.string().valid('moderator', 'admin', 'user')),
});

module.exports = {
	userSignUpSchema,
};
