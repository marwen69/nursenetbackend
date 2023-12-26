// db.js
const { Sequelize } = require('sequelize');

// Create a Sequelize instance and define your database connection
const sequelize = new Sequelize('hospital', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging
});



// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database successful!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

module.exports = sequelize;
