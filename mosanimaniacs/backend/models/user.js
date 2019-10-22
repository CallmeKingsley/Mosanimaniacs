const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    Name: String,
    Email: String,
    Password: String
});

module.exports = mongoose.model('UserSchema', UserSchema);