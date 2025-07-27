//sign.js
const express = require('express');
const signRouter = express.Router();
const {sign} = require('../controllers/sign')

signRouter.post('/user',sign)

module.exports = signRouter;
