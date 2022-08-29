//importy
const Employee = require('../model/employee');
const Role = require('../model/role');
const Student = require('../model/student');
const sequelize = require('../model/database');
const controller = {}

// controller.test = (req, res) => {
//     const data = {
//         name: "Radosław Gackowski",
//         age: 23,
//         city: 'Bydgoszcz'
//     }

//     console.log("Dane wysłane z controllera w formacie json z obiektu data")
//     res.json(data);
// }
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
            roleId: 1,
        });
        Role.create({
            role:'Project Manager'
        });
        Role.create({
            role:'Programmer'
        })
        Employee.create({
          name: 'Ania',
          email: '1998ania@gmail.com',
          address: 'Fordońska 431a/3',
          phone: '883777158',
          roleId: 2,
        })
        Employee.create({
          name: 'Damian',
          email: '2000damian@gmail.com',
          address: 'Strzelecka x/y',
          phone: 'xyz123456',
          roleId: 3,
        })
        Student.create({
          name: 'Damian',
          surname: 'Smoliński',
          email: '2000damian@gmail.com',
          address: 'Strzelecka x/y',
          phone: 'xyz123456',
          password: "1",
        })
        Student.create({
          name: 'Radosław',
          surname: 'Gackowski',
          email: '1998radq@gmail.com',
          address: 'Strzelecka x/y',
          phone: 'xyz123456',
          password: "12345",
        })
        const data = Employee.findAll();
        return data;
    })
    .catch(err => {
        return err;
    });
    res.json({success: true, data: response });
}
controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
      where: { id: id },
      include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data: data });
}
controller.list = async (req, res) => {
    //funkcja do pobierania elementów z tabeli Employee
    const data = await Employee.findAll({
      include: [ Role ]
    })
    .then(function(data){
      return data;
    })
    .catch(error => {
      return error;
    });

    res.json({success : true, data : data});

  }
controller.create = async (req,res) => {
    // data
    const { name, email, address, phone, role } = req.body;
    // create
    const data = await Employee.create({
      name: name,
      email: email,
      address: address,
      phone: phone,
      roleId: role
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      console.log("Errorazo "+error)
      return error;
    })
    // return res
    res.status(200).json({
      success: true,
      message:"Pracownik dodany do bazy danych",
      data: data
    });
  }
  controller.update = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const {name, email, address, phone, role } = req.body;
    console.log(name, email, address, phone, role);
    // Update data
    const data = await Employee.update({
      name:name,
      email:email,
      address:address,
      phone:phone,
      roleId:role
    },
    {
      where: { id: id}
    })
    .then(function(data){
      return data;
    })
    .catch(error => {
      return error;
    })
    // console.log(data.name);
    res.status(200).json({
      success: true,
      message:"Pracownik updated",
      data: data
    });
    // res.json({success:true, data:data, message:"Updated successful"});
  }
  controller.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await Employee.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Deleted successful"});
  }

module.exports = controller;