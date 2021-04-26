'use strict';

// 3rd Party Resources
const express = require('express');


//internal files
const authRoutes = require('./routes/auth');


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

//Auth Routes
app.use(authRoutes);

app.get('/test', (req, res) => {
    res.status(200).send('hi');
})



module.exports = app;

