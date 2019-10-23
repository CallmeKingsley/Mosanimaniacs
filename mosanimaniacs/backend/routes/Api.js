const express = require('express');

const router = express.Router();

const user = require('./user');
const question = require('./questions');

router.use('/users', user);
router.use('/questions', question);


module.exports = router;
