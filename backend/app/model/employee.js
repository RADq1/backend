const Sequelize = require('sequelize');
const sequelize = require('./database')

const Role = require('./Role');
//mozemy stworzyc zmienna const nametable = "nazwatabeli";
//oraz uzyć ją zamiast 'employee'
const Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    roleId: {
        type: Sequelize.INTEGER,
        //referencja do innego modelu
        references: {
            model: Role,
            key: 'id'
        }
    }
},
{
    timestamps: false,
});

Employee.belongsTo(Role);

module.exports = Employee;