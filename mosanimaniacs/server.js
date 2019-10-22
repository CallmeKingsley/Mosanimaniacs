const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
    'mongodb://smart_todoList:Password1@ds229068.mlab.com:29068/heroku_b30fmcz3'
    ,(err)=>{
      if(err){
          console.log("something bad happened")
          console.log(err)
      }else{
          console.log("something good happened")
      }
})

app.listen(3003,()=>{
    console.log("connected")
})