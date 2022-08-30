const express = require('express');
const app = express();
const loginRoute = require('./app/routes/loginRoute');
const employeeRouters = require('./app/routes/employeeRoute');
const colors = require('colors');
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "abcdefghijklmnouprz123"
process.env.REFRESH_TOKEN_SECRET= "abcdefghijklmnouprz123"
process.env.userWithEmail

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(token);
    if(!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.student = data;
        next();
    })
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use('/employee', employeeRouters);
//token
app.use('/login', loginRoute);
app.use('/refresh-token', loginRoute)
app.use('/logout', loginRoute)
app.use('/test', (req,res) => {
    res.send("Test route");
})

app.get('/student', authMiddleware, (req,res) => {
    res.send("Panel studenta");
})

app.use("/", (req, res)=>{
    res.send("Hello world from NodeJS Express");
})

app.listen(app.get('port'), () => {
    console.log("Start server on port " +app.get('port'));
})