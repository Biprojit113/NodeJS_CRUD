const express = require('express');           //imported express package

const router = express.Router();    //using built-in-function Router in express package
const  mongoose = require('mongoose'); // importing mongoose
const {updateOne}= require('../models/students');
const Student = require('../models/students');
// here router.get()is a built in function and / holds the request path like ../students 
// if we just use / then it will indicate the after part of / req,res, are for request handling and next return
//the code
/*router.get('/',(req,res,next)=>{
  res.status(200).json({
      message : "Get Request!!"
  })*/

  //how to get request 
  router.get('/',(req,res,next)=>{
         Student.find()            // built in function to find the values in Student 'Query'
         .exec()                   //  to execute the query
         .then(result=>res.status(200).json(result))                    // then and catch both are same as post
         .catch(err => res.status(500).json(err))
})
router.post('/',( req, res, next)=> {
  
  const information ={                               // created an object information
    
        _id : mongoose.Types.ObjectId(),                       // took unique ids
        Name : req.body.Name,                                // show the path to connect with batch
        Batch : req.body.Batch,                                
        Section : req.body.Section,                                 // show the path to connect with name
        
        email: req.body.email
      
     }

     const student = new Student(information);            //created an object to pass information
     student.save()                                         //after passing we need to save it
     .then(result => res.status(200).json(result))              //if it goes well then we need to return a promise (.then())in json format message
     .catch(err => res.status(500).json(err))                                                 // catch will take the errors like try-catch

})

router.get('/:studentId',(req,res,next)=>{                   //studentId variable will take the unique ids or info after /
  const id = req.params.studentId;                           // now to get the u.ids of student in a request url we use params builtin function
  Student.findById(id)                         //built in function to find id
  .exec()
  .then(result=> res.status(200).json(result))
  .catch(err=>res.status(500).json(err))
})
router.delete('/:studentId',(req,res,next)=>{

     const id = req.params.studentId;
     Student.deleteOne({ _id: id })       // here identified the query option or where to delete(through _id)                    
      .exec()
      .then(result=>res.status(200).json(result))
      .catch(err=>res.status(500).json(err))
})

//to update or patch data in database
router.patch('/:studentId',(req, res, next)=>{
  const id = req.params.studentId;
  const updateObj = {};                                  //creating a null object  
  for(const info of req.body){
    updateObj[info.key] = info.value;                       //using for loop iterating through req.body and then creating index and varriables
  }
  
  Student.updateOne( {_id : id}, {$set: updateObj})                      //$set : is a syntex and its mandatory while patching 
  .exec()
  .then(result=>res.status(200).json(result))
  .catch(err=>res.status(500).json({
    message: "Error"
  }));
})

// res.status(201).json({
  //     message : "Successfully posted!!"
  // })
module.exports = router;