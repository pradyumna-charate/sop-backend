const UserModel = require('../models/UserModel');

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Error: Unauthorized'
      });
    }

    const response = {
      statusCode: 200,
      statusMessage: 'Success',
      data: {
        userid: user._id,
        orgid: user.organization.id,
        orgname: user.organization.name,
        siteid: user.site.id,
        sitename: user.site.name,
        userdetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token: 'your-auth-token', // Generate or retrieve a token here
      },
    };

    console.log('Login Response:', response); // Logging the response to the console
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
}
const addUser = async (req, res) => {
    const userData = req.body;
  
    try {
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        statusCode: 500,
        statusMessage: 'Failed to add user data'
      });
    }
  };
  
  const getUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        statusCode: 500,
        statusMessage: 'Failed to fetch user data'
      });
    }
  };
  
  module.exports = {loginUser, addUser, getUsers };