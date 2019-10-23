const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs

const QuizSchema = mongoose.Schema({
  quizName: String,
  quizId: mongoose.Schema.Types.ObjectId,
  quizQuestions: [],
});

module.exports = mongoose.model('tempQuizSchema', QuizSchema);
