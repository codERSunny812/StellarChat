const { mongoose } = require("mongoose");


const conversationSchema = mongoose.Schema({
    members:{
        type:Array,
        required:true
    }
});


exports.conversationModal = mongoose.model('conversationModal',conversationSchema);