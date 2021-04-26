'use strict';

//3rd party libs
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//internal files
const basicAuth = require('../auth/authMiddleware.js');
const Users = require("../models/users.js");

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async (req, res) => {

    try {
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(201).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, (req, res) => {
    res.status(200).json({ "user": res.user });
});


module.exports = router;