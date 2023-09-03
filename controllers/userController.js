// Controller logic for user routes
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const Company = require('../models/Company');
exports.getLoginPage = (req, res) => {
    const userType = 'user'; // Assuming you've set userType in your middleware
    console.log("User Type:", userType);
    res.render('login', { userType }); // Render the login page
};


exports.getDashboard = (req, res) => {
    // Handle user dashboard logic here
    // ...
};
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
   
    try {
        // Check if the user with the provided email exists and is registered by the admin
        const user = await Company.findOne({ email: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // User authentication successful
            const token = jwt.sign({ userType: 'user' }, jwtSecret); // Create a JWT token
            res.cookie('token', token); // Set the token as a cookie (you can also send it as a response)
            res.send('Login Successful !!!!!!!!');
        } else {
            // Authentication failed
            res.send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        // Handle login error here
        res.status(500).send('Error during login');
    }
};

