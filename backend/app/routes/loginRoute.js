const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController")

router.post('/checkLogin', loginController.checkLogin);
module.exports = router;
