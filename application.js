//Request Handling

const express = require('express');   //importing express package 
const application = express();                            // using express as a fucntion (created an application)

const studentRequest = require('./API/Routes/students'); // importing students file

application.use('/students', studentRequest); //(Its a middleware works on giving he information from user to server or server to user) when user search for (localhost:3000/students)then it will return to students file 

module.exports = application;                 // exporting application to use it publicly like using in server.js  first we need to export it then import in server.js for further use..
