const Sequelize = require('sequelize');
const sequelize = require('./database')

//mozemy stworzyc zmienna const nametable = "nazwatabeli";
//oraz uzyć ją zamiast 'employee'
const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    // token: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    // },
//     roleId: {
//         type: Sequelize.INTEGER,
        // referencja/relacja do innego modelu
        // references: {
        //     model: Role,
        //     key: 'id'
        // }
//     }
},
{
    timestamps: false,
});
//relacje
// Employee.belongsTo(Role);

module.exports = Student;