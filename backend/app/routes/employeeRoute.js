const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/customerController')

router.get('/waka', (req,res) => {
    res.json({status: 'Employeed Saved'});
});

router.get('/test', employeeController.test);
//tworzenie tabeli do bazy danych -- baze danych stworzylem sam, phpmyadmin
router.get('/createTable', employeeController.createTables);
router.get('/list', employeeController.list);
module.exports = router;
