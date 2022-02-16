const express = require('express');           //imported express package
const router = express.Router();    //using built-in-function Router in express package

// here router.get()is a built in function and / holds the request path like ../students 
// if we just use / then it will indicate the after part of / req,res, are for request handling and next return
//the code
router.get('/',( req, res, next)=>{                     

  res.status(200).json({                                    // if there is a request then we will give 200 as status code and then print the message at json
      message: "Get Request!!"  
                           
  })

})
router.post('/',( req, res, next)=>{

  res.status(201).json({
      message : "Successfully posted!!"
  })

})

module.exports = router;