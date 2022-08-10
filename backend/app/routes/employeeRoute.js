const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/customerController');
const Employee = require('../model/employee');

// router.get('/waka', (req,res) => {
//     res.json({status: 'Employeed Saved'});
// });

// router.get('/test', employeeController.test);
//tworzenie tabeli do bazy danych -- baze danych stworzylem sam, phpmyadmin
router.get('/createTable', employeeController.createTables);
router.get('/list', employeeController.list);
router.post('/create',employeeController.create);
router.get('/get/:id', employeeController.get);
router.post('/update/:id', employeeController.update);
router.post('/delete', employeeController.delete);
module.exports = router;
