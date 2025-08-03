const { User } = require("../models/userModel")
const { encryptPassword, comparePassword } = require("../utils/encryptAndDcrypt")
const generateToken = require("../utils/jwt")


const getUser = async (req, res)=> { 
    try {
        const data = await User.find()
        if(!data || data.length ===0) { 
            return res.status(404).json({status : 404, message : "user does not exists"})
        }
        res.status(200).json(data)
    } catch (error) {
        console.log("Getting error while fetching user", error)
        res.status(500).json({message : "Server Error while fetching user"})
    }
 }

 const createUser = async (req, res) => { 
    const {name, email, password, age} = req.body
    if(!name || !email || !password ) { 
        res.json({ message : "Name and email is required"})
    } 
    const alreadyExist = await User.findOne({email: email})
    if(alreadyExist) { 
       return res.json({message: "user already present with this email"})
    }
    const hashedPassword = await encryptPassword(password)
    const user = new User({ 
        name: name, 
        email: email, 
        password : hashedPassword, 
        age: age
    })
    const newUser = await user.save()
    return res.status(200).json({message: "Created successfully", newUser})
 }

 const loginUser = async (req, res)=> { 
    try {
        const {email, password } = req.body; 
        const findUser = await User.findOne({email: email})

        if(!findUser) { 
            return res.status(404).json({message: "Invalid Credentials"})
        }        

        const isTrue = await comparePassword(email, password)

        if(!isTrue.success) { 
            return res.status(401).json({message : isTrue.message})
        }

        const token = generateToken(findUser)

        res.status(200).json({success : true, message: "Login Successfully", token, user : findUser })
    } catch (error) {
        console.log("Getting error while login", error)
        res.status(500).json({message : "Server Error while login "})
    }
 }
 module.exports = {getUser, createUser, loginUser }