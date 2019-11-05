const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs

const ResponseSchema = mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  Question: String,
  Answer: String,
  Correct: Boolean,
  Points: Number
});

module.exports = mongoose.model('Responses', ResponseSchema);