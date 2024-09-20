const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// @route POST /api/users
// @desc create new user
// @access public
const registerUser = async(req, res)=>{
    //console.log(req.body)
    //res.json({message : "User created"})
    try {
        //get data from request body
        const name = typeof(req.body.name) === "string" && req.body.name.trim().length>0 ? req.body.name.trim() : false
        const email = typeof(req.body.email) === "string" && req.body.email.trim().length>0 ? req.body.email.trim() : false
        const password = typeof(req.body.password) === "string" && req.body.password.trim().length>=8 ? req.body.password.trim() : false
        const pic = req.file ? req.file.buffer.toString('base64') : undefined;
        
        // check if data is valid
        if (!name || !email || !password) {
            return res.status(400).json({message : "invalid required fields"})
        }

        // check if user exists
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message : "user already exists"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        console.log(salt)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const user = await User.create({name, email, password : hashedPassword, pic})
        if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              pic: user.pic,
              token: generateToken(user._id),
            });
          } else {
            res.status(400).json({message : "invalid user data"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "server error"})
    }
}

// @route POST /api/users/login
// @desc login user
// @access public
const loginUser = async(req, res)=>{
    try {
        //ge data from request body
        const email = typeof(req.body.email) === "string" && req.body.email.trim().length>0 ? req.body.email.trim() : false
        const password = typeof(req.body.password) === "string" && req.body.password.trim().length>=8 ? req.body.password.trim() : false

        // check if data is valid
        if (!email || !password) {
            return res.status(400).json({message : "missing required fields"})
        }
        
        //check if user exists and password is valid 
        const user = await User.findOne({email})
        console.log(user)
        
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    pic: user.pic,
                    token: generateToken(user._id)
                })
            }else {
                res.status(400).json({message : "invalid credentials"})
            }
        }else {
            res.status(400).json({message : "invalid credentials"})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "server error"})
    }
}

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = async (req, res) => {
    const searchTerm = req.query.search;
  
    if (searchTerm && searchTerm.trim() !== "") {
      const keyword = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      };
  
      try {
        const users = await User.find({
          ...keyword,
          _id: { $ne: req.user._id },
        });
  
        return res.status(200).send(users);
      } catch (error) {
        return res.status(500).send({ message: "Error retrieving users" });
      }
    }
  
    // If no search term is provided or it's an empty string, return an empty array
    return res.status(200).send([]);
  };
  

const generateToken = (id)=> jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "30d"})
module.exports = {registerUser, loginUser, allUsers }