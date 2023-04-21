require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();


router.post('/add', (req, res) => {
    console.log("apptitude", req.body);
    let technical = req.body;
    console.log("apptitude", apptitude);
    var query1 = "insert into technical (question,image,answer) values(?,?,?);";
    console.log(apptitude.question, apptitude.image, apptitude.answer);
    connection.query(query1, [apptitude.question, apptitude.image, apptitude.answer], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "apptitude added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from apptitude"
    connection.query(query2, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            console.log(err);
            return res.status(500).json(err);
        }
    })
})

module.exports = router;