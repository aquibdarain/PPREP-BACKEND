require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();

router.post('/add', (req, res) => {
    console.log("jobPost", req.body);
    let jobPost = req.body;
    console.log("jobPost", jobPost);
    var query1 = "insert into jobPost (jobTitle,jobDescription,qualification,experience,preferredSkills,jobLocation,email,contact) values(?,?,?,?,?,?,?,?);";
    console.log(jobPost.jobTitle, jobPost.jobDescription, jobPost.qualification, jobPost.experience, jobPost.preferredSkills, jobPost.jobLocation, jobPost.email,jobPost.contact);
    connection.query(query1, [jobPost.jobTitle, jobPost.jobDescription, jobPost.qualification, jobPost.experience, jobPost.preferredSkills, jobPost.jobLocation, jobPost.email,jobPost.contact], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "jobPost added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from jobPost"
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