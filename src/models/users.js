'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

//Encrypting password
usersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Checking if passwords match to authenticate user
usersSchema.methods.authenticateUser = async function (password) {
    const valid = await bcrypt.compare(password, this.password);
    return valid;
}

const Users = mongoose.model('users', usersSchema);

module.exports = Users;