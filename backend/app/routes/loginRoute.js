const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController")

router.post('/checkLogin', loginController.checkLogin);
router.delete('/logout', loginController.logout);
router.post('/refresh-token', loginController.refreshToken);
module.exports = router;
