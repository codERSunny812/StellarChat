const mongoose = require('mongoose');


const statusSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'userModal'
    },
    statusImg:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date, 
        default: Date.now, 
        expires: '24h'
    }
})



const statusModal = mongoose.model('statusModal',statusSchema);

module.exports=statusModal;