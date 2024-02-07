const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
   email:{
    type:String,
    required:true,
    unique: true  //this will ensure that the email is not repeated in database
   },
   password:{
    type: String,
    required:true
   },
   token:{
    type:String
   },
   image_Id:{
    type:String
   }
});


exports.userModal = mongoose.model('userModal',userSchema);