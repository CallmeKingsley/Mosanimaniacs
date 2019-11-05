const express = require('express'); // eslint-disable-line import/no-commonjs
const Response = require('../models/Responses');
// eslint-disable-line import/no-commonjs
const router = express.Router();

router.get('/', (req, res) => {
    Response.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
    .catch((err) => {
        res.status(500).json({
            error: err,
        });
    });
});

const createResponses = data => {
    console.log(data);
    return data.map(response => {
        const newResponse = new Response({
            Question: response.Question,
            Answer: response.Answer,
            Correct: response.Correct,
            Points: response.Points
        });

        return newResponse.save();
    });
}

router.post('/', (req, res) => {
    Promise
        .all(createResponses(req.body))
        .then(responses => {
            res.status(201).json(responses);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    // console.log(req.body);
});

module.exports = router;