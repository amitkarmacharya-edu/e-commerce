const express = require("express");
const path = require('path')
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { get } = require("./routes/productRoutes");

dotenv.config();
connectDB();
const app = express();

if(process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'))
}

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../','frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send(`App is running... `)
  })
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
console.log(__dirname)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port : ${PORT}`
  );
});
