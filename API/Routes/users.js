const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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


module.exports = router;