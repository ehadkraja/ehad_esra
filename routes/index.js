const express = require('express');
const router = express.Router();


router.route('/').get( (req, res) => {
    res.send('Project Esra Durovi, Ehad Kraja');
});

module.exports = router;
