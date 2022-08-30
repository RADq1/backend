// const Student = require('../model/student');
const Employee = require("../model/employee");
const Student = require("../model/student");
const jwt = require("jsonwebtoken");
const colors = require('colors');

// const sequelize = require('../model/database');
const controller = {}
const refreshTokens = []
controller.checkLogin = async (req, res) => {
    const {email, password} = req.body;

    userWithEmail = await Student.findOne({ where: { email } }).catch(
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
      process.env.JWT_SECRET, {expiresIn: '15s'}
    );
    const refreshToken = jwt.sign({id: userWithEmail.id, email: userWithEmail.email},
      process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15s'}
      )
    refreshTokens.push(refreshTokens);
    res.json({success:true,data: userWithEmail, message:`Login successful`, token: jwtToken, refreshToken: refreshToken});
}
//NIE DZIALA
controller.refreshToken = async (req,res) => {
  //JEST NULL, nie wiem dlaczego
  const {token} = req.body
  if (refreshTokens.includes(token)){
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err,data) =>{
    if(err){
      return res.sendStatus(403);
    }
  })
  const newAccessToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET, {expiresIn: '15s'}
  );
  res.json({token: newAccessToken});
}

controller.logout = async (req, res) => {

}
module.exports = controller;