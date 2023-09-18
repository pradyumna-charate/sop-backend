// Import required modules
const express = require('express'); // Express framework for creating web applications
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const productRoutes = require('./routes/productRoutes'); // Import routes for products
const sopRoutes = require('./routes/sopRoutes'); // Import routes for SOPs
const userRoutes = require('./routes/userRoutes'); // Import routes for users
const transactionRoutes = require('./routes/transactionRoutes'); // Import routes for transactions
const cors = require('cors');
const path = require('path');

const app = express(); // Create an Express app
const port = 3000; // Define the port number

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://komald:XD1nSooMpmlJ5lnR@cluster0.qbxnwx0.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // If there's an error
db.once('open', () => {
  console.log('Connected to MongoDB'); // When the connection is established
});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON request bodies
app.use(cors()); // Use cors middleware to enable CORS
app.use('/api/v1', sopRoutes); // Use SOP routes at the '/api/v1' path
app.use('/api/v1', userRoutes); // Use user routes at the '/api/v1' path
app.use('/api/v1', productRoutes); // Use product routes at the '/api/v1' path
app.use('/api/v1', transactionRoutes); // Use transaction routes at the '/api/v1' path


app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Start the server and log a message
});
