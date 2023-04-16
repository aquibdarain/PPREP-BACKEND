const express = require('express');
const app = express();
require("dotenv").config();

database = require('./config/db.connection')
PORT = process.env.PORT;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("home page")
})
app.listen(PORT, () => {
    console.log(`the server is running on ${PORT}`)
})
