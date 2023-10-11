const express = require('express')
const router = express.Router();

 

const {
    getTeamDetails,
    getToyDetails
} = require("../controller/toy.controller");

 

router.route("/toys/team").get(getTeamDetails);

 

router.route("/toys/all/:location").get(getToyDetails);

 

module.exports = router;