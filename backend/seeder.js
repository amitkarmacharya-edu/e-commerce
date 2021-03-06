const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const User = require('./models/userModel')
const connectDB = require('./config/db')
const products = require('./data/products')
const users = require('./data/users')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(p => {
      return { ...p, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log('Data Imported');
    process.exit()
  } catch (error) {
    console.error(`error: ${error}`)
    process.exit(1)
  }
}


const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed');
    process.exit()
  } catch (error) {
    console.error(`error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}