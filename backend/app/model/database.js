const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node',
    'admin',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
//sprawdzenie polaczenia z baza danych
async function testDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'.green);
      } catch (error) {
        console.error('Unable to connect to the database:'.red, error);
      }
}
testDb();
module.exports = sequelize;