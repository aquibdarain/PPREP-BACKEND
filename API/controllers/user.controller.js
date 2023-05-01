require('dotenv').config();
const express = require('express');
const connection = require('../../config/db.connection');
let router = express.Router();

const jwt = require('jsonwebtoken');
var auth = require('../auth/authentication');
var checkRole = require('../auth/checkRole')

router.post('/signup',
    (req, res) => {
        let user = req.body;
        let query = "select email,password,role,status from user where email=?";
        console.log(user);
        connection.query(query, [user.email], (err, results) => {
            if (!err) {
                if (results.length <= 0) {
                    let query1 = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                    connection.query(query1, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                        if (!err) {
                            return res.status(200).json({ message: "Successfully Registered" })
                        }
                        else {
                            return res.status(500).json(err);
                        }
                    })
                }
                else {
                    return res.status(400).json({ message: "Email already exits" });
                }
            }
            else {
                return res.status(500).json(err)
            }
        })
    })

router.post('/login', (req, res) => {
    let user = req.body;
    let query2 = "select email,password,role,status from user where email=?";
    connection.query(query2, [user.email], (err, results) => {
        if (!err) {
            if (results.length < 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" })
            }
            // else if (results[0].status === 'false') {
            //     return res.status(401).json({ message: "wait for admin approval" })
            // }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(500).json({ message: "something went wrong. Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     }
// })

// router.post('/forgotPassword', (req, res) => {
//     const user = req.body;
//     let query3 = "select email,password from user where email=?";
//     connection.query(query3, [user.email], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 return res.status(200).json({ message: "Password sent successfully to your email" });
//             }
//             else {
//                 var mailOption = {
//                     from: process.env.EMAIL,
//                     to: results[0].email,
//                     subject: 'Password by cafe management system',
//                     html: '<p><b>Your login details for cafe management system </b><br><b>Email:</b>' + results[0].email + '<br><b>Password:</b>' + results[0].password + '<br><a href="http://localhost:4200">Click here to login </a></p>'
//                 };
//                 transporter.sendMail(mailOption, function (error, info) {
//                     if (error) {
//                         console.log(error);
//                     }
//                     else {
//                         console.log('Email sent :' + info.response);
//                     }
//                 });
//                 return res.status(200).json({ message: "Password sent successfully to your email" });

//             }
//         }
//         else {
//             return res.status(500).json(err);
//         }
//     })
// })

// vid 4
// api is working if auth and check role is removed 
router.get('/getallUser', (req, res) => {
    // var query = "select id,name,email,contactNumber,status from user where role ='user' ";
    var query = "select * from user ";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

// vid4 
// api is working if auth and check role is removed 
router.patch('/update', /*auth.authenticateToken,*/ checkRole.checkRole, (req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User id does not exist" })
            }
            return res.status(200).json({ message: "User Updated Successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    })
})


// vid4

router.get('/checkToken', /*auth.authenticateToken,*/(req, res) => {
    return res.status(200).json({ message: "true" })
})

// router.post('/changePassword', (req, res) => {
//     const user = req.body;
//     const email = res.locals.email;
//     var query = "select * from user where email=? and password=?";
//     connection.query(query, [email, user.oldPassword], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 return res.status(400).json({ message: "Incorrect old password" })
//             }
//             else if (results[0].password == user.oldPassword) {
//                 query = "update user set password=? where email=? ";
//                 connection.query(query, [user.newPassword, email], (err, results) => {
//                     if (!err) {
//                         return res.status(200).json({ message: "password updated successfully" })
//                     }
//                     else {
//                         return res.status(500).json(err);
//                     }
//                 })
//             }
//             else {
//                 return res.status(400).json({ message: "Something went wrong. Please try again later" })
//             }
//         }
//         else {
//             return res.status(500).json(err);
//         }

//     })
// })

module.exports = router;