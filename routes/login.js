//login.js
const express = require('express');
const { matching } = require('../controllers/login');
const loginRouter = express.Router();

loginRouter.post('/user',matching)

module.exports = loginRouter;