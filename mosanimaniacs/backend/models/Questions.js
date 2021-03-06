const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs

const QuestionSchema = mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  Question: String,
  Options: [],
  Answer: String,
  Attempted: Boolean,
  Correct: Boolean
});

module.exports = mongoose.model('tempQuestionSchema', QuestionSchema);