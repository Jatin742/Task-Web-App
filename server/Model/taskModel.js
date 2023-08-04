const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending"
    },
});

//Export the model
module.exports = mongoose.model('Task', taskSchema);