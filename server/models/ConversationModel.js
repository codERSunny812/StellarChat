const { mongoose } = require("mongoose");


// it will store the id  of the loggedIn user and the user whom we have texted
const conversationSchema = mongoose.Schema({
    members:{
        type:Array,
        required:true
    }
});


exports.conversationModal = mongoose.model('conversationModal',conversationSchema);