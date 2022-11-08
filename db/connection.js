const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});
sequelize.authenticate().then(result=>{
    console.log('Connection has been established successfully.');
}).catch (error=>{
    console.log(error)
    console.error('Unable to connect to the database:');
  })

module.exports = sequelize