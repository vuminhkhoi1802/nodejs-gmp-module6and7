const bcrypt = require('bcryptjs');
const {v4} = require('uuid');

const encryptInputString = (inputStr) => {
	return bcrypt.hashSync(inputStr, 8);
};

const generateUUIDV4 = () => {
	return v4();
};

const getDurationInMilliseconds = (start) => {
	const NS_PER_SEC = 1e9;
	const NS_TO_MS = 1e6;
	const diff = process.hrtime(start);

	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const validateSchema = (payload, schema) => {
	const { error } = schema.validate(payload);
	return !error;
};

module.exports = {
	encryptInputString,
	generateUUIDV4,
	getDurationInMilliseconds,
	validateSchema,
};
