
                                        // Signup and Signin Schema \\



const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,          // a unique id
     name: String,          
    email: String,                                       // email and password for users
    password: String

})

module.exports = mongoose.model('Users',userSchema);