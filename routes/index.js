//index.js
const express = require('express');
const signRouter = require('./sign');
const loginRouter = require('./login');
const getRouter=require('./getData');
const postRouter=require('./postData');
const mainRouter = express.Router();

mainRouter.use('/sign',signRouter)
mainRouter.use('/login',loginRouter)
mainRouter.use('/get',getRouter)
mainRouter.use('/post',postRouter)

module.exports = mainRouter;