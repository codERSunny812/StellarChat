const { default: mongoose } = require("mongoose");

// user modal to store the data of the user
const groupSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    avtar:{
    type:String,
    required:t
    },
    members: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User'
     }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

exports.groupModal = mongoose.model("groupModal", groupSchema);

