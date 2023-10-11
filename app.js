const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

 

let toy = fs.readFileSync("./data/toys.json");

 

let app = express();
app.use(bodyParser.json());

module.exports = app; 

const toyRoutes = require("./api/routes/toy.routes");

 

app.use("", toyRoutes);
const port = 3033;
app.listen(port,()=>{
    console.log("Toy Service is running"); 
})