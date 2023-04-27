const express = require('express')
const bodyparser = require('body-parser')
const cors = require("cors")
const mongoose=require("mongoose")
const app = express()
const routes = require('./routes/routes');
const conn=require('./db/db');
require('dotenv').config();

app.use(cors());
app.use(bodyparser.json());
const port=process.env.PORT;
app.listen(port, ()=>{
    console.log('Server started at port 8000')
})
// const redis= require("redis");
// const client1 = redis.createClient();
app.use('/api', routes);
app.get("/tisha", (req, res)=>{
    res.send("Tisha APi.........")
})
app.get("/kishan", (req,res)=>{
    res.send("Will you become my atm and u r toooo intelligent!!")
})



