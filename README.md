# Node.js GMP Khoi Vu Module 6 & 7

### Summary

In this project, instead of following all the pre-requisites in previous modules, I had altered the requirement by simplifying it just to create two entities: User & Role with many-to-many relationship.

### Requirement
- [NodeJS version 14](https://nodejs.org/en/)
- [Docker & DockerCompose](https://docs.docker.com/compose/)
- A `.env` file (Will be provided separately)


### Instructions:
- Clone this repo
- Copy & paste the `.env` provided by me to the root directory of this project
- Execute the following commands in two separate terminal windows

```
$ docker-compose up

$ npm run start
```

### Side Notes:

Please comment out this portion of code in `server.js` file after the first run of this project without making any changes to the database schema

Also in order to run the unit tests properly, this portion also needs to be commented out after the first run of the project

```javascript
db.sequelize.sync({force: true}).then(async () => {
	logger.info('Drop and Resync Database with { force: true }');
	initRoles();
	await initUsers();
});
```
