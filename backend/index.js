const express = require('express');
const app = express();
const employeeRouters = require('./app/routes/employeeRoute');
const colors = require('colors');

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