const Sequelize = require('sequelize');
const sequelize = require('./database');

const Role = sequelize.define('role', {
    role: Sequelize.STRING,
},
{
    //usuniecie createdAt, deletedAt z tabeli przy tworzeniu za pomoca sequelize
    timestamps: false,
});

module.exports = Role;