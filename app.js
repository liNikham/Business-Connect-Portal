require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require("mongoose");
const dbConnectionString = process.env.DB_CONNECTION_STRING
const app=express();
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(console.log("Database successfully connected"))
.catch(err=>{
  console.log(err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/admin', adminRoutes);

// Use the user routes
app.use('/user', userRoutes);

// ... other configurations and middleware

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});