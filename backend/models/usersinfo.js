const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regForm = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    reg: {
        type: String,
        required: true,
        unique: true
    },
    degree: {
        type: String,
        required: true
    },
    spc: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    states: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('usersinfo', regForm)