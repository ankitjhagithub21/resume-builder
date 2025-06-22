const validator = require('validator')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const genToken = (userId) => {
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'1d'})
}

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }


        //email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter valid email address.", success: false })
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exist.", success: false })
        }

        //password validation
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter strong password.", success: false })
        }

        //hash passoword
        const hashedPassword = bcrypt.hash(password, 12);

        //create user
        
        user = new User({
            name,
            email,
            password:hashedPassword
        })

        const savedUser = await user.save();

        //generate token
        const token = genToken(savedUser._id) 


        //send res

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1*24*60*60*1000
        })

        res.status(201).json({message:"Account created successfully.",success:true,data:{
            _id:savedUser._id,
            name:savedUser.name,
            email:savedUser.email
        }})

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false })
        }

        //compare password

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword){
            return res.status(400).json({message:"Wrong email or password.",success:false})
        }

        //generate token
        const token = genToken(savedUser._id) 


        //send res

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1*24*60*60*1000
        })

        res.status(200).json({message:`Welcome back ${user.name}`,success:true,data:{
            _id:user._id,
            name:user.name,
            email:user.email
        }})

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
}

module.exports = {
    register,
    login
}