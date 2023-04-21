require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();


router.post('/add', (req, res) => {
    console.log("aptitude", req.body);
    let aptitude = req.body;
    console.log("aptitude", aptitude);
    var query1 = "insert into aptitude (question,image,answer) values(?,?,?);";
    console.log(aptitude.question, aptitude.image, aptitude.answer);
    connection.query(query1, [aptitude.question, aptitude.image, aptitude.answer], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "aptitude added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from aptitude"
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


router.put('/update/:id',(req, res, next) => {
    let id = req.params.id
    aptitude = req.body;
    var query5 = "UPDATE aptitude SET question=?,image=?,answer=? where id=" + id;
    connection.query(query5, [aptitude.question, aptitude.image, aptitude.answer], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "aptitude id does not found" })
            }
            return res.status(200).json({ message: "aptitude updated successfully" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})
module.exports = router;
