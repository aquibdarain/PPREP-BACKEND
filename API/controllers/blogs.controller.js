require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();

router.post('/add', (req, res) => {
    console.log("blogs", req.body);
    let blogs = req.body;
    console.log("blogs", blogs);
    var query1 = "insert into blogs (title,description,image,content) values(?,?,?,?);";
    console.log(blogs.title, blogs.description, blogs.image, blogs.content);
    connection.query(query1, [blogs.title, blogs.description, blogs.image, blogs.content], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "blogs added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select * from blogs"
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

router.get('/getById/:id', (req, res, next) => {
    const id = req.params.id;
    var query4 = "select id, title,description,image,content from blogs where id=?";
    connection.query(query4, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err)
        }
    })
})


router.put('/update/:id', /*checkRole.checkRole,*/(req, res, next) => {
    let id = req.params.id
    let blogs = req.body;
    var query5 = "UPDATE blogs SET title=?,description=?,image=?,content=? where id=" + id;
    connection.query(query5, [blogs.title, blogs.description, blogs.image, blogs.content], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "blogs id does not found" })
            }
            return res.status(200).json({ message: "blogs updated successfully" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})


router.delete('/delete/:id', /*checkRole.checkRole,*/(req, res, next) => {
    const id = req.params.id;
    var query6 = "delete from blogs where id=?";
    connection.query(query6, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "blogs id does not found" });
            }
            return res.status(200).json({ message: "blogs deleted successfuly" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})


module.exports = router