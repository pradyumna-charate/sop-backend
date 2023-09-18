
// Import required modules
const express = require('express'); // Import Express framework
const UserController = require('../controllers/UserController'); // Import the UserController for handling user-related operations

const router = express.Router(); // Create an instance of an Express router

// Define routes and associate them with corresponding controller functions
router.post('/login', UserController.loginUser); // POST route for user login, handled by loginUser function in UserController
router.post('/add-user', UserController.addUser); // POST route for adding a new user, handled by addUser function in UserController
router.get('/users', UserController.getUsers); // GET route for retrieving users, handled by getUsers function in UserController

module.exports = router; // Export the router for use in other parts of the application
