//Request Handling

const express = require('express');   //importing express package 
  const application = express();                       // using express as a fucntion (created an application)

const studentRequest = require('./API/Routes/students'); // importing students file
const userRequest = require('./API/Routes/users');
const mongoose = require('mongoose'); //importing mongoosepplication = express();   

//took the link from cluster connect and then created a variable "env" in file nodemon.json which holds my password for this database

mongoose.connect('mongodb+srv://st:'+ process.env.MON_PASS +'@cluster0.29iwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');  // with the help of b-i-f connect i connected the project with mongodb
// to take data from request body (req.body.Name) we need to use parse
application.use(express.json());                         // the data will go as json format 
application.use(express.urlencoded({                    // if it doesn't change to json format then we encoded it manuallly using that
   extended : true
}))

application.use('/students', studentRequest); //(Its a middleware works on giving he information from user to server or server to user) when user search for (localhost:3000/students)then it will return to students file 
application.use('/users', userRequest);            
module.exports = application;                 // exporting application to use it publicly like using in server.js  first we need to export it then import in server.js for further use..
