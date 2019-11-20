const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs

const QuizSchema = mongoose.Schema({
    quizId: mongoose.Schema.Types.ObjectId,
    quizTitle: String,
//   Options: [],
//   Answer: String,
//   Attempted: Boolean,
//   Correct: Boolean
    questions: []
});

module.exports = mongoose.model('Quizzes', QuizSchema);