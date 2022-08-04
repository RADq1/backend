const express = require('express');
const app = express();
const employeeRouters = require('./app/routes/employeeRoute');
const colors = require('colors');

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
app.use('/test', (req,res) => {
    res.send("Test route");
})

app.use("/", (req, res)=>{
    res.send("Hello world from NodeJS Express");
})

app.listen(app.get('port'), () => {
    console.log("Start server on port " +app.get('port'));
})