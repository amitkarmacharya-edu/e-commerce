const { response } = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require('../utils/generateTokens')

// @desc Auth user & get tokens
// @route POST /api/users/login
// @access public
const authUser = expressAsyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await User.findOne({ email })
   if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
   } else {
     res.status(401)
     throw new Error('Invalid email or password')
   }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

module.exports = { authUser, getUserProfile }
