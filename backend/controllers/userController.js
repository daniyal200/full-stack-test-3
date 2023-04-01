const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//userRegister
const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body
  
    if (!name || !username || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ username })
  
    if (userExists) {
      res.status(400)
      // throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

  const loginUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    // Check for user username
    const user = await User.findOne({ username })
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  })

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
})



module.exports = {
    registerUser,
    loginUser
}
