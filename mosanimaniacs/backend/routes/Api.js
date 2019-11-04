const express = require('express');

const router = express.Router();

const user = require('./user');
const question = require('./questions');
const responses = require('./responses');

router.use('/users', user);
router.use('/questions', question);
router.use('/responses', responses);

module.exports = router;
