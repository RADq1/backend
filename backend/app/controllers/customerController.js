//importy
const Employee = require('../model/employee');
const Role = require('../model/role');
const sequelize = require('../model/database');
const controller = {}

controller.test = (req, res) => {
    const data = {
        name: "Radosław Gackowski",
        age: 23,
        city: 'Bydgoszcz'
    }

    console.log("Dane wysłane z controllera w formacie json z obiektu data")
    res.json(data);
}
//zeby stworzyc tabele trzeba uzyc routes //employee/testdata
controller.createTables = async (req,res) => {
    //sequelize.sync() odpowiada za tworzenie automatycznie tabel w bazie danych
    const response = await sequelize.sync({ force: true }).then(function() {
        console.log("Czyszczenie bazy danych, tworzenie nowych tabel".rainbow)
        //reczne tworzenie rekordow
        Role.create({
            role:'Admin'
        });
        Employee.create({
            name: 'Radosław',
            email: '1998radq@gmail.com',
            address: 'Fordońska 431a/3',
            phone: '661614088',
            roleId: 1
        });
        const data = Employee.findAll();
        return data;
    })
    .catch(err => {
        return err;
    });
    res.json({success: true, data: response });
}

controller.list = async (req,res) => {
    const data = await Employee.findAll();
    res.json(data);
}
module.exports = controller;