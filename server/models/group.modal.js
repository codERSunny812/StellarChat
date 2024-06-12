const { default: mongoose } = require("mongoose");

// user modal to store the data of the user
const groupSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique:true
    },
    avtar:{
    type:String
    },
    members: { 
        type:Array
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

exports.groupModal = mongoose.model("groupModal", groupSchema);

