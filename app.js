const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

 

let toy = fs.readFileSync("./data/toys.json");

 
const port = 3033;

let app = express();
app.use(cors(port))
app.use(bodyParser.json());

module.exports = app; 

const toyRoutes = require("./api/routes/toy.routes");

 

app.use("", toyRoutes);
app.listen(port,()=>{
    console.log("Toy Service is running"); 
})