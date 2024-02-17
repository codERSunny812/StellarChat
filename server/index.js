// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();
const jwt   = require("jsonwebtoken");
const {connectDatabase} = require('./Database/data_connection')

// connect to the database
connectDatabase();

// import the files 
const {userModal} = require('./models/UserModal')

const app = express();
const port =process.env.PORT;

// middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello from the server");
});

// registration route
app.post('/api/register', async (req, res, next) => {
    try {
        // taking the data from the front end
        const { fullName, email, password } = req.body;

        // checking that the data is present or not
        if (!fullName || !email || !password) {
            return res.status(400).json({
                status: "incomplete",
                message: "please provide all the details"
            });
        }

        // checking that the user is already exist or not in the database
        const isAlreadyExist = await userModal.findOne({ email });

        if (isAlreadyExist) {
            return res.status(400).json({
                status: "incomplete",
                message: "user already exist"
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user with hashed password
        const newUser = await userModal.create({
            email: email,
            fullName: fullName,
            password: hashedPassword // Set the hashed password
        });

        return res.status(200).json({
            status: 'success',
            message: "user register successfully",
            data:newUser

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});


// login route
app.post('/api/login',async(req,res)=>{
    try {
        const {email,password}= req.body;

        // checking whether the field are empty or not
        if(!email || !password){
            return res.status(400).json({
                status:'fail',
                message: "Email and password are required"
            })}

            const user = await userModal.findOne({email});

            if(!user){
                res.status(404).json({
                    status:'fail',
                    message: "User not found"
                })
            }

            // it will check the user entered password with the user password which is saved into the database
            const validateUser= await  bcrypt.compare(password,user.password);

            if(!validateUser){
                res.status(400).json({
                    status:"fail",
                    message:"email or password is incorrect"
                })
            }
            else{
                const payLoad={
                    userId:user._id,
                    email:user.email
                }

                const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY || "this_is_an_jwt_secret_key";

                jwt.sign(payLoad,JWT_SECRET_KEY,{expiresIn:8400},async (err,token)=>{
                    await  userModal.updateOne({_id : user._id} ,{$set:{token}});
                    user.save();
                    next();
                })
                res.status(200).json({
                    status: 'sucess',
                    message:"user logged in successfully",
                    data:user
                })

            }


        
    } catch (error) {
        console.log(`error in logging of the user ${error}`)
    }
})

// starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});