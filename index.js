const express = require('express');
const app = express();
require("dotenv").config();

PORT = process.env.PORT;
const cors = require('cors');

database = require('./config/db.connection');

const userRoute = require('./API/controllers/user.controller');
const blogsRoute = require('./API/controllers/blogs.controller');
const technical = require('./API/controllers/technical.controller');
const aptitude = require('./API/controllers/aptitude.controller');
const jobPost = require('./API/controllers/jobPost.controller');
const applyJob = require('./API/controllers/applyJob.controller')

app.use(cors('*'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("home page")
})

app.listen(PORT, () => {
    console.log(`the server is running on ${PORT}`)
})

app.use('/user', userRoute);
app.use('/blog', blogsRoute);
app.use('/technical', technical);
app.use('/aptitude',aptitude);
app.use('/jobPost',jobPost);
app.use('/applyJob',applyJob);
