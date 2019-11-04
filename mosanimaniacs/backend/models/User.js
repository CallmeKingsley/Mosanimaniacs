const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs

const UserSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  Name: String,
  Email: String,
  Password: String
});

module.exports = mongoose.model('UserSchema', UserSchema);
