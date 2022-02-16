 const httppackage = require('http');  //imported http package for creating a server
 const port = 3000;          //Created a port

const app = require('./application'); //here ./  will show the related files of that route
 
 const server = httppackage.createServer(app);  //created a server using http which has the built-in-function of createServer 

 server.listen(port);      //now i need to show server the port to listen the requests
 