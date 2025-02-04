const express = require('express');
const { signupHandler,   login } = require('../controller/auth');
const router = express.Router();

router.get('/home' ,(req ,res) => {
    res.json("this is the default route for testing purpose !!")
})
router.post('/sigup' ,signupHandler);
router.post('/login' ,login);
module.exports = router;