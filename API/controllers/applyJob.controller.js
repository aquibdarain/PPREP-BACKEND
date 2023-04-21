require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();

router.post('/add', (req, res) => {
    console.log("applyJob", req.body);
    let applyJob = req.body;
    console.log("applyJob", applyJob);
    var query1 = "insert into applyJob (fullName,address,contact,email,appliedPosition,jobLocation,resume) values(?,?,?,?,?,?,?);";
    console.log(applyJob.fullName, applyJob.address, applyJob.contact, applyJob.email, applyJob.appliedPosition, applyJob.jobLocation, applyJob.resume);
    connection.query(query1, [applyJob.fullName, applyJob.address, applyJob.contact, applyJob.email, applyJob.appliedPosition, applyJob.jobLocation, applyJob.resume], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "applyJob added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from applyJob"
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