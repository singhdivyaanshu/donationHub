const mongoose = require('mongoose');

const post = new mongoose.Schema({
    userID: {
        type: String,
        
    },
    date: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    postTitle: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postContent: {
        type: String,
    },
    imageLink:{
        type: String,
        required: true

    },
    docLink:{
        type: String,
        required: true

    },
    amountRequired: {
        type: Number,
        required: true
    },
    amountCollected: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Post', post);
