require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();

router.post('/add', (req, res) => {
    console.log("technical", req.body);
    let technical = req.body;
    console.log("technical", technical);
    var query1 = "insert into technical (question,image,answer) values(?,?,?);";
    console.log(technical.question, technical.image, technical.answer);
    connection.query(query1, [technical.question, technical.image, technical.answer], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "technical added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from technical"
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