const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);