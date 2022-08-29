// const Student = require('../model/student');
const Employee = require("../model/employee");
const Student = require("../model/student");
const jwt = require("jsonwebtoken");
const colors = require('colors');

// const sequelize = require('../model/database');
const controller = {}

controller.checkLogin = async (req, res) => {
    const {email, password} = req.body;

    const userWithEmail = await Student.findOne({ where: { email } }).catch(
      (err) => {
        // console.log("Error: ", err);
        console.log(`Error ${err}`.red)
      }
    );
    if(!userWithEmail)
    {
      return res.status(400).json({message: "Podany użytkownik nie istnieje!"})
    }
    if(userWithEmail.password !== password)
    {
      return res
        .status(400)
        .json({message: "Niepoprawne hasło!"})
    }
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.JWT_SECRET, {expiresIn: '15m'}
    );
    const refreshToken = jwt.sign({id: userWithEmail.id, email: userWithEmail.email},
      process.env.REFRESH_TOKEN_SECRET, {expiresIn: 525600}
      )

    res.json({success:true,data: userWithEmail, message:`Login successful`, token: jwtToken, refreshToken: refreshToken});
}
module.exports = controller;