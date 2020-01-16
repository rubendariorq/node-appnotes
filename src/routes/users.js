const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.send("Logging in");
});

router.get('/users/signup', (req, res) => {
    res.send('User registered');
});

module.exports = router;