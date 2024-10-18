const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
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

// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Increase file upload limit size
app.use(bodyParser.json({limit: '10mb', strict: false}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// Middleware for parsing cookie from the request
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "client/build")));

// Make a directory accessible as a public dir
app.use('/uploads', express.static('uploads'));

// Database connection
let DB_HOST, JWT_SECRET;

// Load from Docker secrets if available
if (fs.existsSync('/run/secrets/db_host')) {
  DB_HOST = fs.readFileSync('/run/secrets/db_host', 'utf8').trim();
  JWT_SECRET = fs.readFileSync('/run/secrets/jwt_secret', 'utf8').trim();
  console.log(`Database Host: ${DB_HOST}`);
} else {
  // Fallback to environment variables for local development
  DB_HOST = process.env.DB_HOST;
  JWT_SECRET = process.env.JWT_SECRET;
}

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log("PLEASE MAKE SURE YOU'RE CONNECTED TO THE DATABASE");
  console.log(err);
});

db.once('open', () => {
  console.log('Database connection established');
  
  // Insert test document to ensure database is created
  const testSchema = new mongoose.Schema({ name: String });
  const Test = mongoose.model('Test', testSchema);
  Test.create({ name: 'test' })
    .then(() => console.log('Test document inserted'))
    .catch(err => console.error('Failed to insert test document', err));
});

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/stats', verifyUser, StatsRoute);
app.use('/api/brands', verifyUser, BrandRoute);
app.use('/api/categories', verifyUser, CategoryRoute);
app.use('/api/customers', verifyUser, CustomerRoute);
app.use('/api/suppliers', verifyUser, SupplierRoute);
app.use('/api/products', verifyUser, ProductRoute);
app.use('/api/sales', verifyUser, SalesRoute);

// When a path is not found, return the build (frontend) part.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
