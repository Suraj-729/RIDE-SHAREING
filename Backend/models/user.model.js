const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name is at least 3 charcters upto long'],

        },
        lastname: {
            type: String,
            minlength: [3, 'last name is at least 3 charcters upto long'],

        }

    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least five charcters']
    },
    password: {
        type: String,
        required: true,
    },

    socketId: {
        type: String,
    },
})