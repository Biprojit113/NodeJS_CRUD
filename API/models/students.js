                                   // Schema (Database desgin) \\

const mongoose = require('mongoose');
//for designing schema we use builtinfunction of mongoose Schema and then declare which kind of coloums or rows and which type 
//where ObjectID is a built in unique values and name,batch taken as string then exported it
const studentSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    Batch: String,
    Section: String,
    email: String
    
    
})

module.exports = mongoose.model('Student', studentSchema);

