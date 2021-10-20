'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { logger } = require('./app/config/logger.config');
const {	getDurationInMilliseconds } = require('./app/utils/utils');
// database
const db = require('./app/models');
const {
	initRoles,
	initUsers,
} = require('./app/seeds/seedData');

const app = express();

const corsOptions = {
	origin: 'http://localhost:5001'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Uncomment this on your first run of the project, then comment it out if not making any changes to the DB Structure
db.sequelize.sync({force: true}).then(async () => {
	logger.info('Drop and Resync Database with { force: true }');
	initRoles();
	await initUsers();
});

app.use((req, res, next) => {
	logger.info(`${req.method} ${req.originalUrl} [STARTED]`);
	const start = process.hrtime();

	logger.info('Request query: ' + JSON.stringify(req.query));
	logger.info('Request params: ' + JSON.stringify(req.params));
	logger.info('Request body: ' + JSON.stringify(req.body));

	res.on('finish', () => {
		const durationInMilliseconds = getDurationInMilliseconds(start);
		console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
	});

	res.on('close', () => {
		const durationInMilliseconds = getDurationInMilliseconds(start);
		console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
	});

	next();
});

// simple route by default
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Khoi Vu NodeJS GMP application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

process.on('unhandledRejection', (reason, promise) => {
	logger.error('Unhandled Rejection at: ' + JSON.stringify(promise) + ' reason: ' + reason);
});

process.on('uncaughtException', (error) => {
	logger.error('Caught unhandle exception: ' + error);
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
