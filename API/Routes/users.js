const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');     // importing Users Schema

// Signup is also a process of post 
//for password gonna use hash cause plain text (123rre)is not secure at database so we use encripted password in database 
// by using hash
//hashvalue will add the differences to password by adding random strings which doesn't have hash values

router.post('/signup',(req,res,next)=>{

    Users.find({email:req.body.email})
   .exec()
   .then(users =>{                                                   //promises return as array like result also an array 
       if(users.length){                                
           res.status(500).json({
               message: "Mail Already Exits!!!!"
           })
       }
       else {
           bcrypt.hash(req.body.password, 10,(err,hash)=>{                                     // using bcrypt package and hash function we hash the password used salting(addding random string) then returning the promise
            if(err){
                res.status(500).json({
                    message: "Signup Error!!!!"
                })
            } 
            else{
               const information = {                                                  // printing the informations as object 
                   _id : mongoose.Types.ObjectId(),
                   name : req.body.name,                 
                   email: req.body.email,
                   password : hash
               }
                        // then we save the informations
                const user = new Users(information);                        //calling 
                user.save()
                .then(result=>res.status(200).json(result))
                .catch(err=>res.status(500).json(err))
            }  
           })
       }
   })
   .catch(err=>res.status(500).json(err))

})


   // signin

   router.post('/signin',(req,res,next)=>{
    Users.findOne({email:req.body.email})                                           // finding the requested email by comparing with the database existed email
    .exec()
    .then(users=>
     {
         if(!users)                                                          // if there is no such email then close the process
         {
             res.status(500).json({
                 message : "Authentication Failed"
             })
         }
         else{
             bcrypt.compare(req.body.password,users.password,(err,result)=>{                     // if there is an email exits then next step is to compare the password with req. password    
                 if(err){ 
                     console.log(err);                                                          // if it found false then quit the process
                     res.status(500).json({
                         message: "Password Wrong!!!!!"
                     })
                 }
                 if(result)
                 {
                     // for taking process.env.JWT_KEY as a string we use `${process.env.JWT_KEY}`
                    const token = jwt.sign({id: users._id,name:users.name,email:users.email},`${process.env.JWT_KEY}`,{           //passing the result with jWT token here's how to assign it process.env.JWT... is like process.env.MON_PASS
                                                                                             // as a pass we can use any part of user here we used id,name,email
                        expiresIn : 3600
                    });
                    
                    res.status(200).json({
                        message : "Authentication Successfull!!!",
                        token : token
                    })
                 }
                 else {
                     res.status(500).json({
                         message : "Try Again!!"
                     })
                 }
                 
                 
             })
         }
     })
     .catch(err=>res.status(500).json(err))
})

 


module.exports = router;