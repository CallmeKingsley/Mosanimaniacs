const express = require('express'); // eslint-disable-line import/no-commonjs
const Response = require('../models/Responses');
// eslint-disable-line import/no-commonjs
const router = express.Router();

const createResponses = data => {
    return data.map(response => {
        const newResponse = new Response({
            Question: response.Question,
            Answer: response.Answer,
            Points: response.Points
        })

        return newResponse.save();
    });
}

router.post('/', (req, res) => {
    Promise
        .all(createResponses(req.body))
        .then(responses => {
            console.log(responses);
            res.status(201).json(responses);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    console.log(req.body);
});

module.exports = router;