const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();
const verifyUser = require('./middlewares/verifyUser');
const AuthRoute = require('./routes/auth.route');
const BrandRoute = require('./routes/brand.route');
const CategoryRoute = require('./routes/category.route');
const CustomerRoute = require('./routes/customer.route');
const SupplierRoute = require('./routes/supplier.route');
const ProductRoute = require('./routes/product.route');
const SalesRoute = require('./routes/sales.route');
const StatsRoute = require('./routes/stats.route');

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // Increse file upload limit size
// app.use(bodyParser.json({limit: '10mb', strict: false}));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// middleware for parsing cookie from the request
app.use(cookieParser());
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "../client/build")));
// make a directory accessible as a public dir
app.use('/uploads', express.static('uploads'));

// Database connection
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;
mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', (err) => {
  console.log("PLEASE MAKE SURE YOU'RE CONNECTED TO THE INTERNET (DATABASE IS ON A REMOTE SERVER)")
  console.log(err);
})
db.once('open', () => {
  console.log('Database connection established');
})

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/stats', verifyUser, StatsRoute);
app.use('/api/brands', verifyUser, BrandRoute);
app.use('/api/categories', verifyUser, CategoryRoute);
app.use('/api/customers', verifyUser, CustomerRoute);
app.use('/api/suppliers', verifyUser, SupplierRoute);
app.use('/api/products', verifyUser, ProductRoute);
app.use('/api/sales', verifyUser, SalesRoute);
// When a path is not found, return the build( frontend ) part.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
