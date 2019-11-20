const express = require('express');

const router = express.Router();

const user = require('./user');
const question = require('./questions');
const responses = require('./responses');
const quizzes = require('./quizzes');

router.use('/users', user);
router.use('/questions', question);
router.use('/responses', responses);
router.use('/quizzes', quizzes);

module.exports = router;
