const winston = require('winston');
const { format } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const logger = winston.createLogger({
	level: 'info',
	format: combine(
		colorize(),
		label({ label: 'App' }),
		timestamp(),
		printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`)
	),
	defaultMeta: {},
	transports: [
		new winston.transports.Console()
	],
});

exports.logger = logger;
